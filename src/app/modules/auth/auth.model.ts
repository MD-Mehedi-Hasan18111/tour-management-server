import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './auth.interface'
import { role } from './auth.constants'

const userSchema = new Schema<IUser>(
  {
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, enum: role, required: true },
    password: { type: String, required: true },
    name: {
      type: {
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
      },
    },
    address: { type: String, required: true },
    budget: { type: Number, required: false },
    income: { type: Number, required: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

const User = model<IUser, UserModel>('Users', userSchema)

export default User
