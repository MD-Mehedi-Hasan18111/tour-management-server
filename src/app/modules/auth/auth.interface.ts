/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

export type IUser = {
  _id: string
  phoneNumber: string
  role: 'seller' | 'buyer'
  password: string
  name: {
    firstName: string
    lastName: string
  }
  address: string
  budget: number
  income: number
}

export type IUserCredential = {
  phoneNumber: string
  password: string
}

type IUserMethods = {
  isUserExist(phoneNumber: string): Promise<Partial<IUser | null>>
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string | undefined
  ): Promise<boolean>
}

export type UserModel = Model<IUser, Record<string, unknown>, IUserMethods>
