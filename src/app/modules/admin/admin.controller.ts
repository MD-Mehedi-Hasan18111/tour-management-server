import { RequestHandler } from "express"
import sendResponse from "../../../shared/sendResponse"
import httpStatus from "http-status"
import { createAdmin, loginAdmin } from "./admin.service"
import config from "../../../config"

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

export const LoginAdmin: RequestHandler = async (req, res, next) => {
  try {
    const { ...data } = req.body
    const result = await loginAdmin(data)

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
      message: 'Admin logged in successfully',
      data: others,
    })
  } catch (error) {
    next(error)
  }
}