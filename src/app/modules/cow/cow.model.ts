import { Schema, model } from 'mongoose'
import { CowModel, ICow } from './cow.interface'
import { cowCategory, labels, location } from './cow.constants'

const cowSchema = new Schema<ICow>(
  {
    name: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, enum: location, required: true },
    breed: { type: String, required: true },
    weight: {
      type: Number,
      required: true,
    },
    label: { type: String, enum: labels, required: true },
    category: { type: String, enum: cowCategory, required: true },
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Cow = model<ICow, CowModel>('Cows', cowSchema)
