import { RequestHandler } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import {
  deleteUser,
  getAllUsers,
  getSingleUser,
  updateUser,
} from './users.service'

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
