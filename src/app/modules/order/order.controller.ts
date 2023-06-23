import { RequestHandler } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { createOrder, getAllOrder, getOneOrder } from './order.service'

export const MakeOrder: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body
    const result = await createOrder(data)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const GetAllOrder: RequestHandler = async (req, res, next) => {
  try {
    const result = await getAllOrder()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Orders History retrived successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const GetSingleOrder: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await getOneOrder(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order History retrived successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
