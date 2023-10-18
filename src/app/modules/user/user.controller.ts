import { RequestHandler } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { signupUser } from './user.service'

export const SignUp: RequestHandler = async (req, res, next) => {
  try {
    const user = req.body
    const result = await signupUser(user)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user signed up successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
