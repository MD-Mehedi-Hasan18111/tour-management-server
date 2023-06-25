import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import {
  CreateCow,
  DeleteCow,
  GetSingleCow,
  UpdateCow,
  getAllCow,
} from './cow.controller'
import { cowValidation } from './cow.validation'
import { authorization } from '../../../middlewares/authorization'
import { ENUM_USER_ROLE } from '../../../enums/userRole'

const router = express.Router()

router.post(
  '/',
  authorization(ENUM_USER_ROLE.SELLER),
  validateRequest(cowValidation.createCowZodSchema),
  CreateCow
)

router.get(
  '/:id',
  authorization(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.BUYER,
    ENUM_USER_ROLE.SELLER
  ),
  GetSingleCow
)

router.patch(
  '/:id',
  authorization(ENUM_USER_ROLE.SELLER),
  validateRequest(cowValidation.updateCowZodSchema),
  UpdateCow
)

router.delete('/:id', authorization(ENUM_USER_ROLE.SELLER), DeleteCow)

router.get(
  '/',
  authorization(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.BUYER,
    ENUM_USER_ROLE.SELLER
  ),
  getAllCow
)

export const CowRoutes = router
