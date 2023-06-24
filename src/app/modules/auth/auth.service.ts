import httpStatus from "http-status"
import User from "./auth.model"
import ApiError from "../../../errors/ApiError"
import { IUser, IUserCredential } from "./auth.interface"
import { Secret } from "jsonwebtoken"
import config from "../../../config"
import { CreateToken } from "../../../helpers/jwtTokenHelper"


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

export const loginUser = async (payload: IUserCredential) => {
  const { phoneNumber, password } = payload
  const user = new User()
  const isUserExist = await user.isUserExist(phoneNumber)
  // phone number if not found
  if (!isUserExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'User does not exist with this phone number'
    )
  }

  // password if not matched
  const isMatched = await user.isPasswordMatched(
    password,
    isUserExist.password
  )
  if (isUserExist.password && !isMatched) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Password is incorrect')
  }

  // create access token
  const accessToken = CreateToken(
    { id: isUserExist._id, role: isUserExist.role },
    config.jwt.jwt_secret as Secret,
    config.jwt.jwt_expires_in as string
  )

  const refreshToken = CreateToken(
    { id: isUserExist._id, role: isUserExist.role },
    config.jwt.jwt_refresh_secret as Secret,
    config.jwt.jwt_refresh_expires_in as string
  )

  return {
    accessToken: accessToken,
    refreshToken: refreshToken,
  }
}