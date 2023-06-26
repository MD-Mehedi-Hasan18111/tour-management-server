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
exports.getOneOrder = exports.getAllOrder = exports.createOrder = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cow_model_1 = require("../cow/cow.model");
const auth_model_1 = __importDefault(require("../auth/auth.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const order_model_1 = require("./order.model");
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const isBuyerHaveEnoughMoney = yield auth_model_1.default.findOne({ _id: orderData.buyer });
    if (!isBuyerHaveEnoughMoney) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Buyer could not found');
    }
    const choosedCow = yield cow_model_1.Cow.findOne({ _id: orderData.cow });
    if (!choosedCow) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Cow could not found');
    }
    if (choosedCow.price > isBuyerHaveEnoughMoney.budget) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'The buyer have not enough money for buying this cow!');
    }
    let orderResponse = null;
    // Start a transaction
    const session = yield mongoose_1.default.startSession();
    session.startTransaction();
    try {
        // Update the cow's label as sold out
        yield cow_model_1.Cow.updateOne({ _id: orderData.cow }, { $set: { label: 'sold out' } });
        // Deduct the price of the cow from the buyer's budget
        yield auth_model_1.default.updateOne({ _id: orderData.buyer }, { $inc: { budget: -choosedCow.price } });
        // Update the seller's income by adding the price of the cow
        yield auth_model_1.default.updateOne({ _id: choosedCow.seller }, { $inc: { income: choosedCow.price } });
        orderResponse = yield (yield (yield order_model_1.Order.create(orderData)).populate({
            path: 'cow',
            populate: [{ path: 'seller', model: 'Users' }],
        })).populate('buyer');
        // Commit the transaction
        session.commitTransaction();
        session.endSession();
    }
    catch (error) {
        // Abort the transaction
        session.abortTransaction();
        session.endSession();
        throw error;
    }
    return orderResponse;
});
exports.createOrder = createOrder;
const getAllOrder = (user) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if ((user === null || user === void 0 ? void 0 : user.role) == 'admin') {
        query = {};
    }
    else if ((user === null || user === void 0 ? void 0 : user.role) == 'seller' || (user === null || user === void 0 ? void 0 : user.role) == 'buyer') {
        if ((user === null || user === void 0 ? void 0 : user.role) == 'buyer') {
            query = { buyer: user === null || user === void 0 ? void 0 : user.id };
        }
        else if ((user === null || user === void 0 ? void 0 : user.role) == 'seller') {
            const sellerCows = yield cow_model_1.Cow.find({ seller: user === null || user === void 0 ? void 0 : user.id }, '_id').lean();
            query = { cow: { $in: sellerCows.map(cow => cow._id) } };
        }
    }
    const orders = yield order_model_1.Order.find(query)
        .sort({ createdAt: -1 })
        .populate({
        path: 'cow',
        populate: [{ path: 'seller', model: 'Users' }],
    })
        .populate('buyer');
    return orders;
});
exports.getAllOrder = getAllOrder;
const getOneOrder = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if ((user === null || user === void 0 ? void 0 : user.role) == 'admin') {
        query = { _id: id };
    }
    else if ((user === null || user === void 0 ? void 0 : user.role) == 'buyer') {
        // validation buyer
        const order = yield order_model_1.Order.findOne({ _id: id });
        if ((order === null || order === void 0 ? void 0 : order.buyer) !== (user === null || user === void 0 ? void 0 : user.id)) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized for this order');
        }
        query = { _id: id, buyer: user === null || user === void 0 ? void 0 : user.id };
    }
    else if ((user === null || user === void 0 ? void 0 : user.role) == 'seller') {
        // validation seller
        const sellerCows = yield cow_model_1.Cow.find({ seller: user === null || user === void 0 ? void 0 : user.id }, '_id').lean();
        query = { _id: id, cow: { $in: sellerCows.map(cow => cow._id) } };
        const order = yield order_model_1.Order.findOne(query);
        if (!order) {
            throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized for this order');
        }
    }
    const order = yield order_model_1.Order.findOne(query)
        .populate({
        path: 'cow',
        populate: [{ path: 'seller', model: 'Users' }],
    })
        .populate('buyer');
    if (!order) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Order Not Found!');
    }
    return order;
});
exports.getOneOrder = getOneOrder;
