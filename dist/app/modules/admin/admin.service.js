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
exports.loginAdmin = exports.createAdmin = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const admin_model_1 = __importDefault(require("./admin.model"));
const jwtTokenHelper_1 = require("../../../helpers/jwtTokenHelper");
const config_1 = __importDefault(require("../../../config"));
const createAdmin = (adminData) => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield admin_model_1.default.create(adminData);
    return admin;
});
exports.createAdmin = createAdmin;
const loginAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    const admin = new admin_model_1.default();
    const isAdminExist = yield admin.isAdminExist(phoneNumber);
    // phone number if not found
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Admin does not exist with this phone number');
    }
    // password if not matched
    const isMatched = yield admin.isPasswordMatched(password, isAdminExist.password);
    if (isAdminExist.password && !isMatched) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Password is incorrect');
    }
    // create access token
    const accessToken = (0, jwtTokenHelper_1.CreateToken)({ id: isAdminExist._id, role: isAdminExist.role }, config_1.default.jwt.jwt_secret, config_1.default.jwt.jwt_expires_in);
    const refreshToken = (0, jwtTokenHelper_1.CreateToken)({ id: isAdminExist._id, role: isAdminExist.role }, config_1.default.jwt.jwt_refresh_secret, config_1.default.jwt.jwt_refresh_expires_in);
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
    };
});
exports.loginAdmin = loginAdmin;
