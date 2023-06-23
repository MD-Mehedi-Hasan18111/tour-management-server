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
    const id = req.params.id
    const data = req.body
    const result = await updateCow(id, data)
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
    const result = await deleteCow(id)
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
