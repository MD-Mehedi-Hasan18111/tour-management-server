"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cow = void 0;
const mongoose_1 = require("mongoose");
const cow_constants_1 = require("./cow.constants");
const cowSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    price: { type: Number, required: true },
    location: { type: String, enum: cow_constants_1.location, required: true },
    breed: { type: String, required: true },
    weight: {
        type: Number,
        required: true,
    },
    label: { type: String, enum: cow_constants_1.labels, required: true },
    category: { type: String, enum: cow_constants_1.cowCategory, required: true },
    seller: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
}, {
    timestamps: true,
    toJSON: {
        virtuals: true,
    },
});
exports.Cow = (0, mongoose_1.model)('Cows', cowSchema);
