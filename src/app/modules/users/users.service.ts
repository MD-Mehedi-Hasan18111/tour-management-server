import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { IUser } from '../auth/auth.interface'
import User from '../auth/auth.model'

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

  const { name, ...userData } = userUpdateData
  const updateUserData: Partial<IUser> = { ...userData }
  // handle name
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}` as keyof Partial<IUser>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(updateUserData as any)[nameKey] = name[key as keyof typeof name]
    })
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
