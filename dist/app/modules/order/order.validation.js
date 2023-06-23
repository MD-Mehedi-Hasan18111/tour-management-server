"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidation = void 0;
const zod_1 = require("zod");
const orderZodSchema = zod_1.z.object({
    body: zod_1.z.object({
        cow: zod_1.z.string({ required_error: 'order cow is required' }),
        buyer: zod_1.z.string({ required_error: 'buyer is required' }),
    }),
});
exports.orderValidation = {
    orderZodSchema,
};
