import jwt, { Secret } from "jsonwebtoken"

export const CreateToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
) => {
  const token = jwt.sign(payload, secret, { expiresIn: expireTime })
  return token
}