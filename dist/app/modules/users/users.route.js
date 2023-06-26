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
const authorization_1 = require("../../../middlewares/authorization");
const router = express_1.default.Router();
router.get('/my-profile', (0, authorization_1.authorization)("buyer" /* ENUM_USER_ROLE.BUYER */, "seller" /* ENUM_USER_ROLE.SELLER */), users_controller_1.GetMyProfileInfo);
router.patch('/my-profile', (0, authorization_1.authorization)("buyer" /* ENUM_USER_ROLE.BUYER */, "seller" /* ENUM_USER_ROLE.SELLER */), users_controller_1.UpdateMyProfileInfo);
router.patch('/:id', (0, authorization_1.authorization)("admin" /* ENUM_USER_ROLE.ADMIN */), (0, validateRequest_1.default)(user_validation_1.userValidation.updateUserZodSchema), users_controller_1.UpdateUsers);
router.get('/:id', (0, authorization_1.authorization)("admin" /* ENUM_USER_ROLE.ADMIN */), users_controller_1.GetSingleUser);
router.delete('/:id', (0, authorization_1.authorization)("admin" /* ENUM_USER_ROLE.ADMIN */), users_controller_1.DeleteUser);
router.get('/', (0, authorization_1.authorization)("admin" /* ENUM_USER_ROLE.ADMIN */), users_controller_1.GetAllUsers);
exports.UserRoutes = router;
