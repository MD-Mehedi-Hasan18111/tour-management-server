import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import { orderValidation } from './order.validation'
import { GetAllOrder, GetSingleOrder, MakeOrder } from './order.controller'

const router = express.Router()

router.post('/', validateRequest(orderValidation.orderZodSchema), MakeOrder)

router.get('/:id', GetSingleOrder)

router.get('/', GetAllOrder)

export const OrderRoutes = router
