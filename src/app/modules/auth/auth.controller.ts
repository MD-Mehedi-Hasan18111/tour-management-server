import { RequestHandler } from 'express'
import { loginUser } from './auth.service'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'

export const LoginUser: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body
    const result = await loginUser(data)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
