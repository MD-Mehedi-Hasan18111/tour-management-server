import { RequestHandler } from 'express'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import pick from '../../../shared/pick'
import { filterFields } from './cow.constants'
import {
  GetAllCow,
  createCow,
  deleteCow,
  getOneCow,
  updateCow,
} from './cow.service'
import { verifyToken } from '../../../helpers/jwtTokenHelper'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'
import ApiError from '../../../errors/ApiError'

export const CreateCow: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body
    const result = await createCow(data)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cow created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const getAllCow: RequestHandler = async (req, res, next) => {
  try {
    const filters = pick(req.query, filterFields)
    const paginationOptions = pick(req.query, [
      'page',
      'limit',
      'sortBy',
      'sortOrder',
      'minPrice',
      'maxPrice',
    ])
    const result = await GetAllCow(filters, paginationOptions)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'All Cow retrived successfully',
      meta: result.meta,
      data: result.data,
    })
  } catch (error) {
    next(error)
  }
}

export const GetSingleCow: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id
    const result = await getOneCow(id)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cow retrived successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UpdateCow: RequestHandler = async (req, res, next) => {
  try {
    const cowid = req.params.id
    const authToken = req.headers.authorization
    if (!authToken) {
      throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized')
    }
    const verifiedUser = verifyToken(authToken, config.jwt.jwt_secret as Secret)
    const data = req.body
    const result = await updateCow(cowid, verifiedUser, data)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cow updated successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const DeleteCow: RequestHandler = async (req, res, next) => {
  try {
    const id = req.params.id
    const authToken = req.headers.authorization
    if (!authToken) {
      throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized')
    }
    const verifiedUser = verifyToken(authToken, config.jwt.jwt_secret as Secret)
    const result = await deleteCow(id, verifiedUser)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Cow deleted successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}
