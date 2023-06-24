/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

type IName = {
  firstName: string
  lastName: string
}

export type IAdmin = {
  _id: string
  phoneNumber: string
  role: 'admin'
  password: string
  name: IName
  address: string
}

export type IAdminCredential = {
  phoneNumber: string
  password: string
}

type IAdminMethods = {
  isUserExist(phoneNumber: string): Promise<Partial<IAdmin | null>>
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string | undefined
  ): Promise<boolean>
}

export type AdminModel = Model<IAdmin, Record<string, unknown>, IAdminMethods>
