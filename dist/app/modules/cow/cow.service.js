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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCow = exports.updateCow = exports.getOneCow = exports.GetAllCow = exports.createCow = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelper_1 = __importDefault(require("../../../helpers/paginationHelper"));
const cow_model_1 = require("./cow.model");
const cow_constants_1 = require("./cow.constants");
const auth_model_1 = __importDefault(require("../auth/auth.model"));
const createCow = (cowData, user) => __awaiter(void 0, void 0, void 0, function* () {
    const FoundSeller = yield auth_model_1.default.findOne({
        _id: cowData.seller,
        role: 'seller',
    });
    if (!FoundSeller) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Seller not found');
    }
    // validation seller
    if ((cowData === null || cowData === void 0 ? void 0 : cowData.seller) !== user.id) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not authorized to create cow for other seller');
    }
    const newCow = yield (yield cow_model_1.Cow.create(cowData)).populate('seller');
    if (!newCow) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create cow');
    }
    return newCow;
});
exports.createCow = createCow;
const GetAllCow = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, skip, sortBy, sortOrder, minPrice, maxPrice } = (0, paginationHelper_1.default)(paginationOptions);
    // Sorting document asc or desc order
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const andCondition = [];
    // Searching query getting document
    if (searchTerm) {
        andCondition.push({
            $or: cow_constants_1.searchAbleFiltersFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    // Filter out document for the exact property and value
    if (Object.keys(filtersData).length) {
        andCondition.push({
            $and: Object.entries(filters).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    // Min price and Max price filtering
    if (minPrice !== 0 && maxPrice !== 0) {
        andCondition.push({
            $and: [
                {
                    price: {
                        $gte: minPrice,
                        $lte: maxPrice,
                    },
                },
            ],
        });
    }
    const whereCondtions = andCondition.length > 0 ? { $and: andCondition } : {};
    const result = yield cow_model_1.Cow.find(whereCondtions)
        .populate('seller')
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield cow_model_1.Cow.countDocuments(whereCondtions);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
exports.GetAllCow = GetAllCow;
const getOneCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findById(id).populate('seller');
    return result;
});
exports.getOneCow = getOneCow;
const updateCow = (id, verifiedUser, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield cow_model_1.Cow.findOne({ _id: id, seller: verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.id });
    if (!isExist) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Cow could not found');
    }
    const result = yield cow_model_1.Cow.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    }).populate('seller');
    return result;
});
exports.updateCow = updateCow;
const deleteCow = (id, verifiedUser) => __awaiter(void 0, void 0, void 0, function* () {
    const isFoundCow = yield cow_model_1.Cow.findOne({ _id: id, seller: verifiedUser === null || verifiedUser === void 0 ? void 0 : verifiedUser.id });
    if (!isFoundCow) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Cow could not found');
    }
    const result = yield cow_model_1.Cow.findByIdAndDelete(id).populate('seller');
    return result;
});
exports.deleteCow = deleteCow;
