"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const auth_constants_1 = require("./auth.constants");
const userSchema = new mongoose_1.Schema({
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, enum: auth_constants_1.role, required: true },
    password: { type: String, required: true },
    name: {
        type: {
            firstName: { type: String, required: true },
            lastName: { type: String, required: true },
        },
    },
    address: { type: String, required: true },
    budget: { type: Number, required: false },
    income: { type: Number, required: false },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
const User = (0, mongoose_1.model)('Users', userSchema);
exports.default = User;
