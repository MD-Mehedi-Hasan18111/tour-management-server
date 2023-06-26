import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IUser } from '../auth/auth.interface'
import User from '../auth/auth.model'
import { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import config from '../../../config'

export const getAllUsers = async (): Promise<IUser[]> => {
  const users = await User.find({}).sort({ createdAt: -1 })
  return users
}

export const getSingleUser = async (id: string): Promise<IUser | null> => {
  const user = await User.findById(id)
  return user
}

export const updateUser = async (
  id: string,
  userUpdateData: Partial<IUser>
): Promise<IUser | null> => {
  const FoundUser = await User.findOne({ _id: id })
  if (!FoundUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User not found')
  }

  const { name, password, ...userData } = userUpdateData
  const updateUserData: Partial<IUser> = { ...userData }
  // handle name
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(updateUserData as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  // handle password
  if (password) {
    userUpdateData['password'] = await bcrypt.hash(
      password,
      Number(config.bcrypt_password_salt)
    )
  }

  const result = await User.findOneAndUpdate({ _id: id }, userUpdateData, {
    new: true,
  })
  return result
}

export const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id)
  return result
}

export const getUserProfileInfo = async (
  user: JwtPayload
): Promise<IUser | null> => {
  const userInfo = await User.findOne({ _id: user?.id, role: user?.role })
  return userInfo
}

export const updateUserProfileInfo = async (
  userUpdateData: Partial<IUser>,
  user: JwtPayload
): Promise<IUser | null> => {
  const FoundUser = await User.findOne({ _id: user?.id })
  if (!FoundUser) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Profile not found')
  }

  const { name, password, ...userData } = userUpdateData
  const updateUserData: Partial<IUser> = { ...userData }
  // handle name
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(updateUserData as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  // handle password
  if (password) {
    userUpdateData['password'] = await bcrypt.hash(
      password,
      Number(config.bcrypt_password_salt)
    )
  }

  const result = await User.findOneAndUpdate(
    { _id: user?.id },
    userUpdateData,
    {
      new: true,
    }
  )
  return result
}
