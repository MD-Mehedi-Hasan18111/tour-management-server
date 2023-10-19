import { z } from 'zod'

const createUserZodSchema = z.object({
  body: z.object({
    firstName: z.string({ required_error: 'First name is required' }),
    lastName: z.string({ required_error: 'Last name is required' }),
    password: z.string({ required_error: 'Password is required' }),
    email: z.string({ required_error: 'Email is required' }),
    gender: z.enum([...(['male', 'female'] as [string, ...string[]])], {
      required_error: 'Gender is required',
    }),
    mobileCode: z.string({ required_error: 'Mobile code is required' }),
    phoneNumber: z.string({ required_error: 'Phone number is required' }),
    status: z
      .enum([...(['active', 'deactive'] as [string, ...string[]])])
      .optional(),
    profileImage: z.string().optional(),
  }),
})

const updateUserZodSchema = z.object({
  body: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    password: z.string().optional(),
    email: z.string().optional(),
    gender: z
      .enum([...(['male', 'female'] as [string, ...string[]])])
      .optional(),
    mobileCode: z.string().optional(),
    phoneNumber: z.string().optional(),
    status: z
      .enum([...(['active', 'deactive'] as [string, ...string[]])])
      .optional(),
    profileImage: z.string().optional(),
  }),
})

export const userValidation = {
  createUserZodSchema,
  updateUserZodSchema,
}
