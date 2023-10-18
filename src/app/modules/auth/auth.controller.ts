import { RequestHandler } from 'express'
import { changePassword, loginUser } from './auth.service'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { verifyToken } from '../../../helpers/jwtTokenHelper'
import config from '../../../config'

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
    let user = null
    if (token) {
      user = verifyToken(token, config.jwt.jwt_secret as string)
    }

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
