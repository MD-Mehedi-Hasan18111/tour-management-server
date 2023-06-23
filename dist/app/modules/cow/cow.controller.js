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
const CreateCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const result = yield (0, cow_service_1.createCow)(data);
        console.log(result);
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
        const id = req.params.id;
        const data = req.body;
        const result = yield (0, cow_service_1.updateCow)(id, data);
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
        const result = yield (0, cow_service_1.deleteCow)(id);
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
