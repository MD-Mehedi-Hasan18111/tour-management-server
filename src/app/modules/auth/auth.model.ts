import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './auth.interface'
import { role } from './auth.constants'
import config from '../../../config'
import bcrypt from 'bcrypt'

const userSchema = new Schema<IUser>(
  {
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, enum: role, required: true },
    password: { type: String, required: true, select: 0 },
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
      transform: function (doc, ret) {
        delete ret.password
        return ret
      },
    },
  }
)

userSchema.pre('save', async function (next) {
  // hashing password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_password_salt)
  )
  next()
})

const User = model<IUser, UserModel>('Users', userSchema)

export default User
