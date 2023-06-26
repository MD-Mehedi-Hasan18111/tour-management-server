"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminValidation = void 0;
const zod_1 = require("zod");
const admin_constants_1 = require("./admin.constants");
const createAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({ required_error: 'Phone number is required' }),
        role: zod_1.z.enum([...admin_constants_1.role], {
            required_error: 'role is required',
        }),
        password: zod_1.z.string({ required_error: 'password is required' }),
        name: zod_1.z.object({
            firstName: zod_1.z.string({ required_error: 'first name is required' }),
            lastName: zod_1.z.string({ required_error: 'last name is required' }),
        }, { required_error: 'Admin name is required' }),
        address: zod_1.z.string({ required_error: 'Address is required' }),
    }),
});
const loginAdminZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        phoneNumber: zod_1.z.string({ required_error: 'Phone number is required' }),
        password: zod_1.z.string({ required_error: 'password is required' }),
    }),
});
exports.adminValidation = {
    createAdminZodSchema,
    loginAdminZodSchema,
};
