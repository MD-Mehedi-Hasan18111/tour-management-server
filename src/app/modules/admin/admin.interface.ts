/* eslint-disable no-unused-vars */
import { Model } from 'mongoose'

type IName = {
  firstName: string
  lastName: string
}

export type IAdmin = {
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
  // isAdminExist(phoneNumber: string): Promise<Partial<IAdmin | null>>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  isAdminExist(phoneNumber: string): any
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>
}

export type AdminModel = Model<IAdmin, Record<string, unknown>, IAdminMethods>
