import { Model, Types } from 'mongoose'
import { IUser } from '../auth/auth.interface'

type ICategory = 'Dairy' | 'Beef' | 'DualPurpose'

type ILocation =
  | 'Dhaka'
  | 'Chattogram'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Barishal'
  | 'Rangpur'
  | 'Mymensingh'
  | 'Comilla'

type ILabel = 'for sale' | 'sold out'

export type ICow = {
  name: string
  age: number
  price: number
  location: ILocation
  breed: string
  weight: number
  label: ILabel
  category: ICategory
  seller: Types.ObjectId | IUser
}

export type CowModel = Model<ICow, Record<string, unknown>>

export type IGenericResponse<T> = {
  meta: {
    page: number
    limit: number
    total: number
  }
  data: T
}

export type ICowFilter = {
  searchTerm?: string
  location?: string
  breed?: string
  category?: string
}
