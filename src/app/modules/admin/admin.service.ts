import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IAdmin, IAdminCredential } from './admin.interface'
import Admin from './admin.model'
import { CreateToken } from '../../../helpers/jwtTokenHelper'
import config from '../../../config'
import { Secret } from 'jsonwebtoken'

export const createAdmin = async (
  adminData: IAdmin
): Promise<IAdmin | null> => {
  const admin = await Admin.create(adminData)
  return admin
}

export const loginAdmin = async (payload: IAdminCredential) => {
  const { phoneNumber, password } = payload
  const admin = new Admin()
  const isAdminExist = await admin.isAdminExist(phoneNumber)
  // phone number if not found
  if (!isAdminExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Admin does not exist with this phone number'
    )
  }

  // password if not matched
  const isMatched = await admin.isPasswordMatched(
    password,
    isAdminExist.password
  )
  if (isAdminExist.password && !isMatched) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password is incorrect')
  }

  // create access token
  const accessToken = CreateToken(
    { id: isAdminExist._id, role: isAdminExist.role },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string
  )

  const refreshToken = CreateToken(
    { id: isAdminExist._id, role: isAdminExist.role },
    config.jwt.jwt_refresh_secret as Secret,
    config.jwt.jwt_refresh_expires_in as string
  )

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  }
}
