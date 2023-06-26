"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const auth_constants_1 = require("./auth.constants");
const config_1 = __importDefault(require("../../../config"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    phoneNumber: { type: String, required: true, unique: true },
    role: { type: String, enum: auth_constants_1.role, required: true },
    password: { type: String, required: true, select: 0 },
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
        transform: function (doc, ret) {
            delete ret.password;
            return ret;
        },
    },
});
// instance methods
userSchema.methods.isUserExist = function (phoneNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield User.findOne({ phoneNumber }, { _id: 1, phoneNumber: 1, password: 1, role: 1 });
        return user;
    });
};
userSchema.methods.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savedPassword);
    });
};
userSchema.pre('save', function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        // hashing password
        this.password = yield bcrypt_1.default.hash(this.password, Number(config_1.default.bcrypt_password_salt));
        next();
    });
});
const User = (0, mongoose_1.model)('Users', userSchema);
exports.default = User;
