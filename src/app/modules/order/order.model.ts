import { Schema, model } from 'mongoose'
import { IOrder, OrderModel } from './order.interface'

const orderSchema = new Schema<IOrder>(
  {
    cow: { type: Schema.Types.ObjectId, ref: 'Cows', required: true },
    buyer: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
)

export const Order = model<IOrder, OrderModel>('Orders', orderSchema)
