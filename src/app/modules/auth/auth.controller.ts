import { RequestHandler } from 'express'
import { changePassword, loginUser } from './auth.service'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { getTokenData } from '../user/user.utils'

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

export const ChangePassword: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body
    const token = req.headers.authorization
    const user = getTokenData(token as string)

    const result = await changePassword(user, data)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Password updated successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
