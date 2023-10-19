import express from 'express'
import { GetUserProfile, SignUp, UpdateUserProfile } from './user.controller'
import validateRequest from '../../../middlewares/validateRequest'
import { userValidation } from './user.validation'

const router = express.Router()

router.post(
  '/signup-user',
  validateRequest(userValidation.createUserZodSchema),
  SignUp
)

router.patch(
  '/profile',
  validateRequest(userValidation.updateUserZodSchema),
  UpdateUserProfile
)

router.get('/profile', GetUserProfile)

export const UserRoutes = router
