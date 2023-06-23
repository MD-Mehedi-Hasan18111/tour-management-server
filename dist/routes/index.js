"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_route_1 = require("../app/modules/users/users.route");
const cow_route_1 = require("../app/modules/cow/cow.route");
const auth_route_1 = require("../app/modules/auth/auth.route");
const order_route_1 = require("../app/modules/order/order.route");
const router = express_1.default.Router();
const allRoutes = [
    {
        path: '/auth',
        route: auth_route_1.AuthRoutes,
    },
    {
        path: '/users',
        route: users_route_1.UserRoutes,
    },
    {
        path: '/cows',
        route: cow_route_1.CowRoutes,
    },
    {
        path: '/orders',
        route: order_route_1.OrderRoutes,
    }
];
allRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
