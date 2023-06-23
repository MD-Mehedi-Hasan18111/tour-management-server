import { z } from 'zod'
import { role } from './admin.constants'

const createAdminZodSchema = z.object({
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
      { required_error: 'Admin name is required' }
    ),
    address: z.string({ required_error: 'Address is required' }),
  }),
})

export const adminValidation = {
  createAdminZodSchema,
}
