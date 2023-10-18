import { IUser } from './user.interface'
import User from './user.model'

export const signupUser = async (userData: IUser): Promise<IUser | null> => {
  const newUser = await User.create(userData)
  return newUser
}
