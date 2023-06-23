"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodErrorHandler = (error) => {
    const errors = error.issues.map(issue => {
        return {
            path: issue.path[issue.path.length - 1],
            message: issue.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        message: error.message,
        errorMessages: errors,
    };
};
exports.default = handleZodErrorHandler;
