"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../config"));
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const zod_1 = require("zod");
const handleZodErrorHandler_1 = __importDefault(require("../errors/handleZodErrorHandler"));
const handleCastError_1 = __importDefault(require("../errors/handleCastError"));
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalErrorHandler = (err, req, res, next) => {
    // eslint-disable-next-line no-unused-expressions
    config_1.default.env === 'development'
        ? console.log(`GlobalErrorHandler: `, err)
        : console.log('GlobalHandlerError', err);
    let statusCode = 500;
    let message = 'Something went wrong!';
    let errorMessages = [];
    if ((err === null || err === void 0 ? void 0 : err.name) === 'ValidationError') {
        const simplified = (0, handleValidationError_1.default)(err);
        statusCode = simplified.statusCode;
        message = simplified.message;
        errorMessages = simplified.errorMessages;
    }
    else if ((err === null || err === void 0 ? void 0 : err.name) === 'CastError') {
        const simplified = (0, handleCastError_1.default)(err);
        statusCode = simplified.statusCode;
        message = simplified.message;
        errorMessages = simplified.errorMessages;
    }
    else if (err instanceof zod_1.ZodError) {
        const simplified = (0, handleZodErrorHandler_1.default)(err);
        statusCode = simplified.statusCode;
        message = simplified.message;
        errorMessages = simplified.errorMessages;
    }
    else if (err instanceof Error) {
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessages = (err === null || err === void 0 ? void 0 : err.message)
            ? [
                {
                    path: '',
                    message: err === null || err === void 0 ? void 0 : err.message,
                },
            ]
            : [];
    }
    else if (err instanceof ApiError_1.default) {
        statusCode = err.statusCode;
        message = err === null || err === void 0 ? void 0 : err.message;
        errorMessages = (err === null || err === void 0 ? void 0 : err.message)
            ? [
                {
                    path: '',
                    message: err === null || err === void 0 ? void 0 : err.message,
                },
            ]
            : [];
    }
    res.status(statusCode).json({
        success: false,
        message: message,
        errorMessages: errorMessages,
        stack: config_1.default.env !== 'production' ? err.stack : undefined,
    });
    next();
};
exports.default = globalErrorHandler;
