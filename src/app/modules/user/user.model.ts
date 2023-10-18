import { Schema, model } from 'mongoose'
import { IUser, UserModel } from './user.interface'
import bcrypt from 'bcrypt'
import config from '../../../config'

const userSchema = new Schema<IUser, Record<string, never>, UserModel>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    gender: { type: String, required: true },
    mobileCode: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true, select: 0 },
    role: { type: String, default: 'user' },
    profileImage: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

userSchema.methods.isUserExist = async function (
  email: string
): Promise<Partial<IUser | null>> {
  const user = await User.findOne({ email }, { email: 1, password: 1, role: 1 })

  return user
}

userSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword)
}

userSchema.pre('save', async function (next) {
  // hashing password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_password_salt)
  )
  next()
})

const User = model<IUser, UserModel>('users', userSchema)

export default User
