import { SortOrder } from 'mongoose'

type IPaginationOptions = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: SortOrder
  minPrice?: number
  maxPrice?: number
}

type IOptionsResult = {
  page: number
  limit: number
  skip: number
  sortBy: string
  sortOrder: SortOrder
  minPrice: number
  maxPrice: number
}

const calculationPagination = (options: IPaginationOptions): IOptionsResult => {
  const page = Number(options.page) || 1
  const limit = Number(options.limit) || 0
  const skip = (page - 1) * limit

  const sortBy = options.sortBy || 'createdAt'
  const sortOrder = options.sortOrder || 'desc'

  const minPrice = options.minPrice || 0
  const maxPrice = options.maxPrice || 0

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
    minPrice,
    maxPrice
  }
}

export default calculationPagination
