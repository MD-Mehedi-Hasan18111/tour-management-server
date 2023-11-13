import { RequestHandler } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import {
  getAllUsers,
  getUserProfile,
  removeUser,
  signupUser,
  updateUserProfile,
  updateUserStatus,
} from './user.service'
import { getTokenData } from './user.utils'

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

export const GetUserProfile: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization

    const user = getTokenData(token as string)

    const result = await getUserProfile(user)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user profile retrieved successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UpdateUserProfile: RequestHandler = async (req, res, next) => {
  try {
    const payload = req.body
    const token = req.headers.authorization

    const user = getTokenData(token as string)

    const result = await updateUserProfile(user, payload)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'profile updated successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const GetAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const user = getTokenData(token as string)

    const result = await getAllUsers(user)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Users retrieved successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UpdateUserStatus: RequestHandler = async (req, res, next) => {
  try {
    const payload = req.body
    const userId = req.query.userId
    const token = req.headers.authorization

    const user = getTokenData(token as string)

    const result = await updateUserStatus(user, payload, userId as string)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'status updated successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const RemoveUser: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.query.userId
    const token = req.headers.authorization

    const user = getTokenData(token as string)

    await removeUser(user, userId as string)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User removed successfully',
    })
  } catch (error) {
    next(error)
  }
}
