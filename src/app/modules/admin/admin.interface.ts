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

export type AdminModel = Model<IAdmin, Record<string, unknown>>
