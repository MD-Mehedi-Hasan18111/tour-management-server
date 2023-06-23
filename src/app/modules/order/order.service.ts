import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { Cow } from '../cow/cow.model'
import { IOrder } from './order.interface'
import User from '../auth/auth.model'
import mongoose from 'mongoose'
import { Order } from './order.model'

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
      await (await Order.create(orderData)).populate('cow')
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

export const getAllOrder = async (): Promise<IOrder[]> => {
  const orders = await Order.find()
    .sort({ createdAt: -1 })
    .populate('cow')
    .populate('buyer')
  return orders
}

export const getOneOrder = async (id: string): Promise<IOrder | null> => {
  const order = await Order.findById(id).populate('cow').populate('buyer')
  return order
}