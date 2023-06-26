import { RequestHandler } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  getUserProfileInfo,
  updateUser,
  updateUserProfileInfo,
} from './users.service'
import ApiError from '../../../errors/ApiError'
import { verifyToken } from '../../../helpers/jwtTokenHelper'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'

export const GetAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const result = await getAllUsers()
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Users retrieved successfully',
      data: result,
    })
  } catch (error) {
    next()
  }
}

export const GetSingleUser: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await getSingleUser(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User retrieved successfully',
      data: result,
    })
  } catch (error) {
    next()
  }
}

export const UpdateUsers: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.params.id
    const updatedData = req.body
    const result = await updateUser(userId, updatedData)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User updated successfully',
      data: result,
    })
  } catch (error) {
    next()
  }
}

export const DeleteUser: RequestHandler = async (req, res, next) => {
  try {
    const userId = req.params.id
    const result = await deleteUser(userId)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User deleted successfully',
      data: result,
    })
  } catch (error) {
    next()
  }
}

export const GetMyProfileInfo: RequestHandler = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) {
      throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized')
    }
    const verifiedUser = verifyToken(token, config.jwt.jwt_secret as Secret)
    const result = await getUserProfileInfo(verifiedUser)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Profile Info retrieved successfully',
      data: result,
    })
  } catch (error) {
    next()
  }
}

export const UpdateMyProfileInfo: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body
    const token = req.headers.authorization
    if (!token) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'You are not authorized for get info'
      )
    }
    const verifiedUser = verifyToken(token, config.jwt.jwt_secret as Secret)
    const result = await updateUserProfileInfo(data, verifiedUser)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Profile Info updated successfully',
      data: result,
    })
  } catch (error) {
    next()
  }
}
