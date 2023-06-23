"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidation = void 0;
const zod_1 = require("zod");
const auth_constants_1 = require("./auth.constants");
const createUserZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({ required_error: 'Phone number is required' }),
        role: zod_1.z.enum([...auth_constants_1.role], {
            required_error: 'role is required',
        }),
        password: zod_1.z.string({ required_error: 'password is required' }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({ required_error: 'first name is required' }),
            lastName: zod_1.z.string({ required_error: 'last name is required' }),
        }, { required_error: 'User name is required' }),
        address: zod_1.z.string({ required_error: 'Address is required' }),
        budget: zod_1.z.number().optional(),
        income: zod_1.z.number().optional(),
    }),
});
exports.authValidation = {
    createUserZodSchema
};
