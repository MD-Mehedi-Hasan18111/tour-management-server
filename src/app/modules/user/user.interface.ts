/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export type IUser = {
  _id?: string
  firstName: string
  lastName: string
  email: string
  gender: 'male' | 'female'
  mobileCode: string
  phoneNumber: string
  password: string
  role: string
  status?: 'active' | 'deactive'
  profileImage?: string
}

type IUserMethods = {
  isUserExist(email: string): Promise<Partial<IUser | null>>
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
}

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>
