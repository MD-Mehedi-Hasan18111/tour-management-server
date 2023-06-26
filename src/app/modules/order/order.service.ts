import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { Cow } from '../cow/cow.model'
import { IOrder } from './order.interface'
import User from '../auth/auth.model'
import mongoose from 'mongoose'
import { Order } from './order.model'
import { JwtPayload } from 'jsonwebtoken'

export const createOrder = async (
  orderData: IOrder
): Promise<IOrder | null> => {
  const isBuyerHaveEnoughMoney = await User.findOne({ _id: orderData.buyer })
  if (!isBuyerHaveEnoughMoney) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Buyer could not found')
  }

  const choosedCow = await Cow.findOne({ _id: orderData.cow })

  if (!choosedCow) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cow could not found')
  }

  if (choosedCow.price > isBuyerHaveEnoughMoney.budget) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'The buyer have not enough money for buying this cow!'
    )
  }

  let orderResponse = null
  // Start a transaction
  const session = await mongoose.startSession()
  session.startTransaction()

  try {
    // Update the cow's label as sold out
    await Cow.updateOne({ _id: orderData.cow }, { $set: { label: 'sold out' } })

    // Deduct the price of the cow from the buyer's budget
    await User.updateOne(
      { _id: orderData.buyer },
      { $inc: { budget: -choosedCow.price } }
    )

    // Update the seller's income by adding the price of the cow
    await User.updateOne(
      { _id: choosedCow.seller },
      { $inc: { income: choosedCow.price } }
    )

    orderResponse = await (
      await (
        await Order.create(orderData)
      ).populate({
        path: 'cow',
        populate: [{ path: 'seller', model: 'Users' }],
      })
    ).populate('buyer')

    // Commit the transaction
    session.commitTransaction()
    session.endSession()
  } catch (error) {
    // Abort the transaction
    session.abortTransaction()
    session.endSession()
    throw error
  }

  return orderResponse
}

export const getAllOrder = async (user: JwtPayload): Promise<IOrder[]> => {
  let query = {}
  if (user?.role == 'admin') {
    query = {}
  } else if (user?.role == 'seller' || user?.role == 'buyer') {
    if (user?.role == 'buyer') {
      query = { buyer: user?.id }
    } else if (user?.role == 'seller') {
      const sellerCows = await Cow.find({ seller: user?.id }, '_id').lean()
      query = { cow: { $in: sellerCows.map(cow => cow._id) } }
    }
  }
  const orders = await Order.find(query)
    .sort({ createdAt: -1 })
    .populate({
      path: 'cow',
      populate: [{ path: 'seller', model: 'Users' }],
    })
    .populate('buyer')
  return orders
}

export const getOneOrder = async (
  id: string,
  user: JwtPayload
): Promise<IOrder | null> => {
  let query = {}
  if (user?.role == 'admin') {
    query = { _id: id }
  } else if (user?.role == 'buyer') {
    // validation buyer
    const order = await Order.findOne({ _id: id })
    if (order?.buyer !== user?.id) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'You are not authorized for this order'
      )
    }
    query = { _id: id, buyer: user?.id }
  } else if (user?.role == 'seller') {
    // validation seller
    const sellerCows = await Cow.find({ seller: user?.id }, '_id').lean()
    query = { _id: id, cow: { $in: sellerCows.map(cow => cow._id) } }
    const order = await Order.findOne(query)
    if (!order) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'You are not authorized for this order'
      )
    }
  }

  const order = await Order.findOne(query)
    .populate({
      path: 'cow',
      populate: [{ path: 'seller', model: 'Users' }],
    })
    .populate('buyer')

  if (!order) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Order Not Found!')
  }

  return order
}
