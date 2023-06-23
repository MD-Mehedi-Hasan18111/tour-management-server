import { Schema, model } from 'mongoose'
import { AdminModel, IAdmin } from './admin.interface'
import { role } from './admin.constants'

const adminSchema = new Schema<IAdmin>(
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
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

const Admin = model<IAdmin, AdminModel>('Admins', adminSchema)

export default Admin
