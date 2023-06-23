import { RequestHandler } from "express"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import { createUser } from "./auth.service"


export const CreateUser: RequestHandler = async (req, res, next) => {
  try {
    const { ...data } = req.body
    const result = await createUser(data)
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}