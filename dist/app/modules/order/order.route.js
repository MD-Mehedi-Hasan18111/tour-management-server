"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../../middlewares/validateRequest"));
const order_validation_1 = require("./order.validation");
const order_controller_1 = require("./order.controller");
const authorization_1 = require("../../../middlewares/authorization");
const router = express_1.default.Router();
router.post('/', (0, authorization_1.authorization)("buyer" /* ENUM_USER_ROLE.BUYER */), (0, validateRequest_1.default)(order_validation_1.orderValidation.orderZodSchema), order_controller_1.MakeOrder);
router.get('/:id', order_controller_1.GetSingleOrder);
router.get('/', (0, authorization_1.authorization)("admin" /* ENUM_USER_ROLE.ADMIN */, "buyer" /* ENUM_USER_ROLE.BUYER */, "seller" /* ENUM_USER_ROLE.SELLER */), order_controller_1.GetAllOrder);
exports.OrderRoutes = router;
