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
exports.UpdateMyProfileInfo = exports.GetMyProfileInfo = exports.DeleteUser = exports.UpdateUsers = exports.GetSingleUser = exports.GetAllUsers = void 0;
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const users_service_1 = require("./users.service");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtTokenHelper_1 = require("../../../helpers/jwtTokenHelper");
const config_1 = __importDefault(require("../../../config"));
const GetAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, users_service_1.getAllUsers)();
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'All Users retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next();
    }
});
exports.GetAllUsers = GetAllUsers;
const GetSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield (0, users_service_1.getSingleUser)(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'User retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next();
    }
});
exports.GetSingleUser = GetSingleUser;
const UpdateUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const updatedData = req.body;
        const result = yield (0, users_service_1.updateUser)(userId, updatedData);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'User updated successfully',
            data: result,
        });
    }
    catch (error) {
        next();
    }
});
exports.UpdateUsers = UpdateUsers;
const DeleteUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        const result = yield (0, users_service_1.deleteUser)(userId);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'User deleted successfully',
            data: result,
        });
    }
    catch (error) {
        next();
    }
});
exports.DeleteUser = DeleteUser;
const GetMyProfileInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized');
        }
        const verifiedUser = (0, jwtTokenHelper_1.verifyToken)(token, config_1.default.jwt.jwt_secret);
        const result = yield (0, users_service_1.getUserProfileInfo)(verifiedUser);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Profile Info retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next();
    }
});
exports.GetMyProfileInfo = GetMyProfileInfo;
const UpdateMyProfileInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const token = req.headers.authorization;
        if (!token) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized for get info');
        }
        const verifiedUser = (0, jwtTokenHelper_1.verifyToken)(token, config_1.default.jwt.jwt_secret);
        const result = yield (0, users_service_1.updateUserProfileInfo)(data, verifiedUser);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Profile Info updated successfully',
            data: result,
        });
    }
    catch (error) {
        next();
    }
});
exports.UpdateMyProfileInfo = UpdateMyProfileInfo;
