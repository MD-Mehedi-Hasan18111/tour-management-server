import express from 'express'
import {
  GetAllUsers,
  GetUserProfile,
  RemoveUser,
  SignUp,
  UpdateUserProfile,
  UpdateUserStatus,
} from './user.controller'
import validateRequest from '../../../middlewares/validateRequest'
import { userValidation } from './user.validation'
import { authorization } from '../../../middlewares/authorization'
import { ENUM_USER_ROLE } from '../../../enums/userRole'

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

router.patch(
  '/update-status',
  authorization(ENUM_USER_ROLE.ADMIN),
  validateRequest(userValidation.updateUserStatusZodSchema),
  UpdateUserStatus
)

router.delete('/remove-user', authorization(ENUM_USER_ROLE.ADMIN), RemoveUser)

router.get('/profile', GetUserProfile)

router.get('/', authorization(ENUM_USER_ROLE.ADMIN), GetAllUsers)

export const UserRoutes = router
