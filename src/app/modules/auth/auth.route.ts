import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import { authValidation } from './auth.validation'
import { CreateUser, LoginUser } from './auth.controller'

const router = express.Router()

router.post(
  '/signup',
  validateRequest(authValidation.createUserZodSchema),
  CreateUser
)

router.post(
  '/login',
  validateRequest(authValidation.loginUserZodSchema),
  LoginUser
)

export const AuthRoutes = router
