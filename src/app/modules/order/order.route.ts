import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import { orderValidation } from './order.validation'
import { GetAllOrder, GetSingleOrder, MakeOrder } from './order.controller'
import { authorization } from '../../../middlewares/authorization'
import { ENUM_USER_ROLE } from '../../../enums/userRole'

const router = express.Router()

router.post(
  '/',
  authorization(ENUM_USER_ROLE.BUYER),
  validateRequest(orderValidation.orderZodSchema),
  MakeOrder
)

router.get('/:id', GetSingleOrder)

router.get(
  '/',
  authorization(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.BUYER,
    ENUM_USER_ROLE.SELLER
  ),
  GetAllOrder
)

export const OrderRoutes = router
