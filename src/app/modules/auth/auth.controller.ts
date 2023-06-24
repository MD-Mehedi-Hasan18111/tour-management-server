import { RequestHandler } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { createUser, loginUser, newTokenGenerate } from './auth.service'
import config from '../../../config'

export const CreateUser: RequestHandler = async (req, res, next) => {
  try {
    const { ...data } = req.body
    const result = await createUser(data)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User sign up successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const LoginUser: RequestHandler = async (req, res, next) => {
  try {
    const { ...data } = req.body
    const result = await loginUser(data)

    // set refresh token into cookie
    const { refreshToken, ...others } = result
    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    }

    res.cookie('refreshToken', refreshToken, cookieOptions)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User logged in successfully',
      data: others,
    })
  } catch (error) {
    next(error)
  }
}

export const NewTokenGenerate: RequestHandler = async (req, res, next) => {
  try {
    const { refreshToken } = req.cookies

    const result = await newTokenGenerate(refreshToken)

    const cookieOptions = {
      secure: config.env === 'production',
      httpOnly: true,
    }

    res.cookie('refreshToken', refreshToken, cookieOptions)

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'New access token generated successfully!',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
