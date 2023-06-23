import { z } from 'zod'
import { cowCategory, labels, location } from './cow.constants'

const createCowZodSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Cow name is required' }),
    age: z.number({ required_error: 'Age is required' }),
    price: z.number({ required_error: 'price is required' }),
    location: z.enum([...(location as [string, ...string[]])], {
      required_error: 'location is required',
    }),
    breed: z.string({ required_error: 'breed is required' }),
    weight: z.number({ required_error: 'weight is required' }),
    label: z.enum([...(labels as [string, ...string[]])], {
      required_error: 'label is required',
    }),
    category: z.enum([...(cowCategory as [string, ...string[]])], {
      required_error: 'category is required',
    }),
    seller: z.string({ required_error: 'seller is required' }),
  }),
})

const updateCowZodSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    age: z.number().optional(),
    price: z.number().optional(),
    location: z.enum([...(location as [string, ...string[]])]).optional(),
    breed: z.string().optional(),
    weight: z.number().optional(),
    label: z.enum([...(labels as [string, ...string[]])]).optional(),
    category: z.enum([...(cowCategory as [string, ...string[]])]).optional(),
    seller: z.string().optional(),
  }),
})

export const cowValidation = {
  createCowZodSchema,
  updateCowZodSchema,
}
