import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import User from '../user/user.model'
import { ILoginCredential } from './auth.interface'
import { CreateToken } from '../../../helpers/jwtTokenHelper'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'

export const loginUser = async (payload: ILoginCredential) => {
  const { email, password } = payload
  const user = new User()

  const isUserExist = await user.isUserExist(email)
  let isPasswordMatch = null
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  } else {
    isPasswordMatch = await user.isPasswordMatched(
      password,
      isUserExist.password as string
    )
  }

  if (isUserExist.password && !isPasswordMatch) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password is incorrect')
  }

  // create access token & refresh token
  const accessToken = CreateToken(
    { userId: isUserExist.email, role: isUserExist.role },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string
  )

  return {
    accessToken: accessToken,
  }
}
