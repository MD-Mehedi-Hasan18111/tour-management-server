import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import { authValidation } from './auth.validation'
import { CreateUser } from './auth.controller'

const router = express.Router()

router.post(
  '/signup',
  validateRequest(authValidation.createUserZodSchema),
  CreateUser
)

export const AuthRoutes = router
