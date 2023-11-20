import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import User from './user.model'
import { JwtPayload, Secret } from 'jsonwebtoken'
import config from '../../../config'
import { CreateToken } from '../../../helpers/jwtTokenHelper'

export const signupUser = async (userData: IUser) => {
  const newUser = await User.create(userData)
  // create access token & refresh token
  const accessToken = CreateToken(
    {
      userId: newUser?._id,
      email: newUser.email,
      role: newUser.role,
    },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string
  )
  return {
    accessToken: accessToken,
    userData: newUser,
  }
}

export const getUserProfile = async (
  userData: JwtPayload | null
): Promise<IUser | null> => {
  if (!userData) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authorized')
  }

  const user = new User()

  const isUserExist = await user.isUserExist(userData?.email)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  const userInfo = await User.findById({ _id: isUserExist?._id })

  return userInfo
}

export const updateUserProfile = async (
  userData: JwtPayload | null,
  updateData: Partial<IUser>
): Promise<IUser | null> => {
  if (!userData) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authorized')
  }

  const user = new User()

  const isUserExist = await user.isUserExist(userData?.email)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  }

  const userInfo = await User.findOneAndUpdate(
    { _id: isUserExist?._id },
    updateData,
    { new: true }
  )

  return userInfo
}

// Admins User manage APIs
export const getAllUsers = async (
  userData: JwtPayload | null
): Promise<IUser[]> => {
  if (!userData) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authorized')
  }

  const user = new User()

  const isUserExist = await user.isUserExist(userData?.email)

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found')
  } else {
    const users = await User.find({ role: { $ne: 'admin' } })
    return users
  }
}

export const updateUserStatus = async (
  userData: JwtPayload | null,
  updateData: Partial<IUser>,
  userId: string | undefined
): Promise<IUser | null> => {
  if (!userData) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authorized')
  }

  const userInfo = await User.findOneAndUpdate({ _id: userId }, updateData, {
    new: true,
  })

  return userInfo
}

export const removeUser = async (
  userData: JwtPayload | null,
  userId: string | undefined
): Promise<IUser | null> => {
  if (!userData) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'User not authorized')
  }

  const userInfo = await User.findOneAndDelete({ _id: userId })

  return userInfo
}
