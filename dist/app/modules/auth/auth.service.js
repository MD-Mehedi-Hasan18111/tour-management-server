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
exports.newTokenGenerate = exports.loginUser = exports.createUser = void 0;
const http_status_1 = __importDefault(require("http-status"));
const auth_model_1 = __importDefault(require("./auth.model"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const config_1 = __importDefault(require("../../../config"));
const jwtTokenHelper_1 = require("../../../helpers/jwtTokenHelper");
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // check budget and income with role
    if (userData.role == 'buyer' &&
        (!userData.budget || userData.budget) &&
        userData.income > 0) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid Buyer Data, Required Budget! Income not allowed for Buyer');
    }
    else if (userData.role == 'seller' &&
        (!userData.income || userData.income) &&
        userData.budget > 0) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Invalid Seller Data, Required Income! Budget not allowed for Seller');
    }
    // set initial budget and income role wise
    if (userData.role == 'buyer' && !userData.income) {
        userData.income = 0;
        if (!userData.budget) {
            userData.budget = 0;
        }
    }
    else if (userData.role == 'seller' && !userData.budget) {
        userData.budget = 0;
        if (!userData.income) {
            userData.income = 0;
        }
    }
    const user = yield auth_model_1.default.create(userData);
    return user;
});
exports.createUser = createUser;
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    const user = new auth_model_1.default();
    const isUserExist = yield user.isUserExist(phoneNumber);
    // phone number if not found
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'User does not exist with this phone number');
    }
    // password if not matched
    const isMatched = yield user.isPasswordMatched(password, isUserExist.password);
    if (isUserExist.password && !isMatched) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Password is incorrect');
    }
    // create access token
    const accessToken = (0, jwtTokenHelper_1.CreateToken)({ id: isUserExist._id, role: isUserExist.role }, config_1.default.jwt.jwt_secret, config_1.default.jwt.jwt_expires_in);
    const refreshToken = (0, jwtTokenHelper_1.CreateToken)({ id: isUserExist._id, role: isUserExist.role }, config_1.default.jwt.jwt_refresh_secret, config_1.default.jwt.jwt_refresh_expires_in);
    return {
        accessToken: accessToken,
        refreshToken: refreshToken,
    };
});
exports.loginUser = loginUser;
const newTokenGenerate = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    try {
        verifiedToken = (0, jwtTokenHelper_1.verifyToken)(token, config_1.default.jwt.jwt_refresh_secret);
    }
    catch (error) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { id } = verifiedToken;
    const isUserExist = yield auth_model_1.default.findById(id);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // generate new access token
    const newAccessToken = (0, jwtTokenHelper_1.CreateToken)({
        id: isUserExist._id,
        role: isUserExist.role,
    }, config_1.default.jwt.jwt_secret, config_1.default.jwt.jwt_expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.newTokenGenerate = newTokenGenerate;
