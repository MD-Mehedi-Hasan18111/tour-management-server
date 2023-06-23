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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.getSingleUser = exports.getAllUsers = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const auth_model_1 = __importDefault(require("../auth/auth.model"));
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield auth_model_1.default.find({}).sort({ createdAt: -1 });
    return users;
});
exports.getAllUsers = getAllUsers;
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield auth_model_1.default.findById(id);
    return user;
});
exports.getSingleUser = getSingleUser;
const updateUser = (id, userUpdateData) => __awaiter(void 0, void 0, void 0, function* () {
    const FoundUser = yield auth_model_1.default.findOne({ _id: id });
    if (!FoundUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User not found');
    }
    const { name } = userUpdateData, userData = __rest(userUpdateData, ["name"]);
    const updateUserData = Object.assign({}, userData);
    // handle name
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`;
            updateUserData[nameKey] = name[key];
        });
    }
    const result = yield auth_model_1.default.findOneAndUpdate({ _id: id }, userUpdateData, {
        new: true,
    });
    return result;
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.deleteUser = deleteUser;
