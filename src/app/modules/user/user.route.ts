import express from 'express'
import { SignUp } from './user.controller'
import validateRequest from '../../../middlewares/validateRequest'
import { userValidation } from './user.validation'

const router = express.Router()

router.post(
  '/signup-user',
  validateRequest(userValidation.createUserZodSchema),
  SignUp
)

export const UserRoutes = router
