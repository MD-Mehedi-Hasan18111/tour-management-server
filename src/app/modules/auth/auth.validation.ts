import { z } from 'zod'
import { role } from './auth.constants'

const createUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({ required_error: 'Phone number is required' }),
    role: z.enum([...role] as [string, ...string[]], {
      required_error: 'role is required',
    }),
    password: z.string({ required_error: 'password is required' }),
    name: z.object(
      {
        firstName: z.string({ required_error: 'first name is required' }),
        lastName: z.string({ required_error: 'last name is required' }),
      },
      { required_error: 'User name is required' }
    ),
    address: z.string({ required_error: 'Address is required' }),
    budget: z.number().optional(),
    income: z.number().optional(),
  }),
})

export const loginUserZodSchema = z.object({
  body: z.object({
    phoneNumber: z.string({ required_error: 'Phone number is required' }),
    password: z.string({ required_error: 'Password is required' }),
  }),
})

export const authValidation = {
  createUserZodSchema,
  loginUserZodSchema,
}
