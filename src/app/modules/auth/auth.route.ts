import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import { authValidation } from './auth.validation'
import { CreateUser, LoginUser, NewTokenGenerate } from './auth.controller'

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

router.post(
  '/refresh-token',
  validateRequest(authValidation.newTokenZodSchema),
  NewTokenGenerate
)

export const AuthRoutes = router
