"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cowValidation = void 0;
const zod_1 = require("zod");
const cow_constants_1 = require("./cow.constants");
const createCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string({ required_error: 'Cow name is required' }),
        age: zod_1.z.number({ required_error: 'Age is required' }),
        price: zod_1.z.number({ required_error: 'price is required' }),
        location: zod_1.z.enum([...cow_constants_1.location], {
            required_error: 'location is required',
        }),
        breed: zod_1.z.string({ required_error: 'breed is required' }),
        weight: zod_1.z.number({ required_error: 'weight is required' }),
        label: zod_1.z.enum([...cow_constants_1.labels], {
            required_error: 'label is required',
        }),
        category: zod_1.z.enum([...cow_constants_1.cowCategory], {
            required_error: 'category is required',
        }),
        seller: zod_1.z.string({ required_error: 'seller is required' }),
    }),
});
const updateCowZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        age: zod_1.z.number().optional(),
        price: zod_1.z.number().optional(),
        location: zod_1.z.enum([...cow_constants_1.location]).optional(),
        breed: zod_1.z.string().optional(),
        weight: zod_1.z.number().optional(),
        label: zod_1.z.enum([...cow_constants_1.labels]).optional(),
        category: zod_1.z.enum([...cow_constants_1.cowCategory]).optional(),
        seller: zod_1.z.string().optional(),
    }),
});
exports.cowValidation = {
    createCowZodSchema,
    updateCowZodSchema,
};
