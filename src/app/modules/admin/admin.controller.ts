import { RequestHandler } from "express"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import { createAdmin } from "./admin.service"


export const CreateAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { ...data } = req.body
    const result = await createAdmin(data)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Admin created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}