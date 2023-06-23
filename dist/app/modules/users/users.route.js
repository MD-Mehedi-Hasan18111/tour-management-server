"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const user_validation_1 = require("./user.validation");
const users_controller_1 = require("./users.controller");
const router = express_1.default.Router();
router.patch('/:id', (0, validateRequest_1.default)(user_validation_1.userValidation.updateUserZodSchema), users_controller_1.UpdateUsers);
router.get('/:id', users_controller_1.GetSingleUser);
router.delete('/:id', users_controller_1.DeleteUser);
router.get('/', users_controller_1.GetAllUsers);
exports.UserRoutes = router;
