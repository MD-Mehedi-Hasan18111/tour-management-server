import { z } from 'zod'

const orderZodSchema = z.object({
  body: z.object({
    cow: z.string({ required_error: 'order cow is required' }),
    buyer: z.string({ required_error: 'buyer is required' }),
  }),
})

export const orderValidation = {
  orderZodSchema,
}
