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
exports.DeleteCow = exports.UpdateCow = exports.GetSingleCow = exports.getAllCow = exports.CreateCow = void 0;
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const cow_constants_1 = require("./cow.constants");
const cow_service_1 = require("./cow.service");
const jwtTokenHelper_1 = require("../../../helpers/jwtTokenHelper");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const CreateCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const token = req.headers.authorization;
        if (!token) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to create new cow');
        }
        const verifiedUser = (0, jwtTokenHelper_1.verifyToken)(token, config_1.default.jwt.jwt_secret);
        const result = yield (0, cow_service_1.createCow)(data, verifiedUser);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Cow created successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.CreateCow = CreateCow;
const getAllCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = (0, pick_1.default)(req.query, cow_constants_1.filterFields);
        const paginationOptions = (0, pick_1.default)(req.query, [
            'page',
            'limit',
            'sortBy',
            'sortOrder',
            'minPrice',
            'maxPrice',
        ]);
        const result = yield (0, cow_service_1.GetAllCow)(filters, paginationOptions);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'All Cow retrived successfully',
            meta: result.meta,
            data: result.data,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllCow = getAllCow;
const GetSingleCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const result = yield (0, cow_service_1.getOneCow)(id);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Cow retrived successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.GetSingleCow = GetSingleCow;
const UpdateCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cowid = req.params.id;
        const authToken = req.headers.authorization;
        if (!authToken) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized');
        }
        const verifiedUser = (0, jwtTokenHelper_1.verifyToken)(authToken, config_1.default.jwt.jwt_secret);
        const data = req.body;
        const result = yield (0, cow_service_1.updateCow)(cowid, verifiedUser, data);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Cow updated successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.UpdateCow = UpdateCow;
const DeleteCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const authToken = req.headers.authorization;
        if (!authToken) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized');
        }
        const verifiedUser = (0, jwtTokenHelper_1.verifyToken)(authToken, config_1.default.jwt.jwt_secret);
        const result = yield (0, cow_service_1.deleteCow)(id, verifiedUser);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Cow deleted successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.DeleteCow = DeleteCow;
