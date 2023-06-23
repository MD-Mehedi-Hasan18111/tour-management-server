export type IPagination = {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  minPrice?: number
  maxPrice?: number
}
