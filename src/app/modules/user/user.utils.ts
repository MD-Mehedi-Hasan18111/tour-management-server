import config from '../../../config'
import { verifyToken } from '../../../helpers/jwtTokenHelper'

export const getTokenData = (token: string) => {
  const userData = verifyToken(token, config.jwt.jwt_secret as string)
  if (userData) {
    return userData
  } else {
    return null
  }
}
