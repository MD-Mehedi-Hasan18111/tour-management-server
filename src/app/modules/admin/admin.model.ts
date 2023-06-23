import { Schema, model } from 'mongoose'
import { AdminModel, IAdmin } from './admin.interface'
import { role } from './admin.constants'
import bcrypt from 'bcrypt'
import config from '../../../config'

const adminSchema = new Schema<IAdmin>(
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

// instance methods
adminSchema.methods.isAdminExist = async function (
  phoneNumber: string
): Promise<Partial<IAdmin | null>> {
  const admin = await Admin.findOne(
    { phoneNumber },
    { _id: 1, phoneNumber: 1, password: 1, role: 1 }
  )
  return admin
}

adminSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword)
}

adminSchema.pre('save', async function (next) {
  // hashing password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_password_salt)
  )
  next()
})

const Admin = model<IAdmin, AdminModel>('Admins', adminSchema)

export default Admin
