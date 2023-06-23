import httpStatus from "http-status"
import User from "./auth.model"
import ApiError from "../../../errors/ApiError"
import { IUser } from "./auth.interface"


export const createUser = async (userData: IUser): Promise<IUser | null> => {
  // check budget and income with role
  if (userData.role == 'buyer' && (!userData.budget || userData.budget) && userData.income > 0) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid Buyer Data, Required Budget! Income not allowed for Buyer'
    )
  } else if (
    userData.role == 'seller' &&
    (!userData.income || userData.income) &&
    userData.budget > 0
  ) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Invalid Seller Data, Required Income! Budget not allowed for Seller'
    )
  }

  // set initial budget and income role wise
  if (userData.role == 'buyer' && !userData.income) {
    userData.income = 0
    if (!userData.budget) {
      userData.budget = 0
    }
  } else if (userData.role == 'seller' && !userData.budget) {
    userData.budget = 0
    if (!userData.income) {
      userData.income = 0
    }
  }

  const user = await User.create(userData)

  return user
}