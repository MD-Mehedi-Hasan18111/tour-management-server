import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import calculationPagination from '../../../helpers/paginationHelper'
import { SortOrder } from 'mongoose'
import { Cow } from './cow.model'
import { ICow, ICowFilter, IGenericResponse } from './cow.interface'
import { IPagination } from './cow.pagination'
import { searchAbleFiltersFields } from './cow.constants'
import User from '../auth/auth.model'
import { JwtPayload } from 'jsonwebtoken'

export const createCow = async (cowData: ICow, user: JwtPayload): Promise<ICow | null> => {
  const FoundSeller = await User.findOne({
    _id: cowData.seller,
    role: 'seller',
  })
  if (!FoundSeller) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Seller not found')
  }

  // validation seller
  if (cowData?.seller !== user.id) {
      throw new ApiError(
        httpStatus.FORBIDDEN,
        'You are not authorized to create cow for other seller'
      )
    }

  const newCow = await (await Cow.create(cowData)).populate('seller')
  if (!newCow) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create cow')
  }

  return newCow
}

export const GetAllCow = async (
  filters: ICowFilter,
  paginationOptions: IPagination
): Promise<IGenericResponse<ICow[]>> => {
  const { page, limit, skip, sortBy, sortOrder, minPrice, maxPrice } =
    calculationPagination(paginationOptions)

  // Sorting document asc or desc order
  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }

  const { searchTerm, ...filtersData } = filters
  const andCondition = []

  // Searching query getting document
  if (searchTerm) {
    andCondition.push({
      $or: searchAbleFiltersFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  // Filter out document for the exact property and value
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filters).map(([field, value]) => ({
        [field]: value,
      })),
    })
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
    })
  }

  const whereCondtions = andCondition.length > 0 ? { $and: andCondition } : {}

  const result = await Cow.find(whereCondtions)
    .populate('seller')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
  const total = await Cow.countDocuments(whereCondtions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

export const getOneCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id).populate('seller')
  return result
}

export const updateCow = async (
  id: string,
  verifiedUser: JwtPayload,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const isExist = await Cow.findOne({ _id: id, seller: verifiedUser?.id })

  if (!isExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cow could not found')
  }

  const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('seller')

  return result
}

export const deleteCow = async (id: string, verifiedUser: JwtPayload): Promise<ICow | null> => {
  const isFoundCow = await Cow.findOne({ _id: id, seller: verifiedUser?.id })
  if (!isFoundCow) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Cow could not found')
  }
  const result = await Cow.findByIdAndDelete(id).populate('seller')
  return result
}
