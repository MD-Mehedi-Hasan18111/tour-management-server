import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import { userValidation } from './user.validation'
import {
  DeleteUser,
  GetAllUsers,
  GetMyProfileInfo,
  GetSingleUser,
  UpdateMyProfileInfo,
  UpdateUsers,
} from './users.controller'
import { authorization } from '../../../middlewares/authorization'
import { ENUM_USER_ROLE } from '../../../enums/userRole'

const router = express.Router()

router.get(
  '/my-profile',
  authorization(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  GetMyProfileInfo
)

router.patch(
  '/my-profile',
  authorization(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  UpdateMyProfileInfo
)

router.patch(
  '/:id',
  authorization(ENUM_USER_ROLE.ADMIN),
  validateRequest(userValidation.updateUserZodSchema),
  UpdateUsers
)

router.get('/:id', authorization(ENUM_USER_ROLE.ADMIN), GetSingleUser)

router.delete('/:id', authorization(ENUM_USER_ROLE.ADMIN), DeleteUser)

router.get('/', authorization(ENUM_USER_ROLE.ADMIN), GetAllUsers)

export const UserRoutes = router
