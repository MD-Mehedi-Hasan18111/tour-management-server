import { RequestHandler } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { createOrder, getAllOrder, getOneOrder } from './order.service'
import { verifyToken } from '../../../helpers/jwtTokenHelper'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'
import ApiError from '../../../errors/ApiError'

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
    const token = req.headers.authorization;
    if(!token){
      throw new ApiError(httpStatus.FORBIDDEN, "You are not authorized")
    }
    const verifiedUser = verifyToken(token, config.jwt.jwt_secret as Secret)
    const result = await getAllOrder(verifiedUser)
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
    const token = req.headers.authorization
    if(!token){
      throw new ApiError(httpStatus.FORBIDDEN, "You are not authorized")
    }
    const verifiedUser = verifyToken(token, config.jwt.jwt_secret as Secret)
    const result = await getOneOrder(id, verifiedUser)
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
