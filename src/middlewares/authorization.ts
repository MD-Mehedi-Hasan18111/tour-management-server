import { NextFunction, Request, Response } from 'express'
import ApiError from '../errors/ApiError'
import httpStatus from 'http-status'
import { verifyToken } from '../helpers/jwtTokenHelper'
import config from '../config'
import { Secret } from 'jsonwebtoken'

export const authorization =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization

      if (!token) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized')
      }

      // verify token
      let verifiedUser = null
      verifiedUser = verifyToken(token, config.jwt.jwt_secret as Secret)

      req.user = verifiedUser

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You are not authorized')
      }

      next()
    } catch (error) {
      next(error)
    }
  }
