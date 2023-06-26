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
exports.GetSingleOrder = exports.GetAllOrder = exports.MakeOrder = void 0;
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const http_status_1 = __importDefault(require("http-status"));
const order_service_1 = require("./order.service");
const jwtTokenHelper_1 = require("../../../helpers/jwtTokenHelper");
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const MakeOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield (0, order_service_1.createOrder)(data);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Order successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.MakeOrder = MakeOrder;
const GetAllOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "You are not authorized");
        }
        const verifiedUser = (0, jwtTokenHelper_1.verifyToken)(token, config_1.default.jwt.jwt_secret);
        const result = yield (0, order_service_1.getAllOrder)(verifiedUser);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Orders History retrived successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.GetAllOrder = GetAllOrder;
const GetSingleOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        const token = req.headers.authorization;
        if (!token) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "You are not authorized");
        }
        const verifiedUser = (0, jwtTokenHelper_1.verifyToken)(token, config_1.default.jwt.jwt_secret);
        const result = yield (0, order_service_1.getOneOrder)(id, verifiedUser);
        (0, sendResponse_1.default)(res, {
            statusCode: http_status_1.default.OK,
            success: true,
            message: 'Order History retrived successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.GetSingleOrder = GetSingleOrder;
