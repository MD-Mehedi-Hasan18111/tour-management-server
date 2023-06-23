import { z } from 'zod'
import { role } from '../auth/auth.constants'

const updateUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string().optional(),
    role: z.enum([...role] as [string, ...string[]]).optional(),
    password: z.string().optional(),
    name: z
      .object({
        firstName: z.string().optional(),
        lastName: z.string().optional(),
      })
      .optional(),
    address: z.string().optional(),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
})

export const userValidation = {
  updateUserZodSchema,
}
