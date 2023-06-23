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

const router = express.Router()

router.post(
  '/',
  validateRequest(cowValidation.createCowZodSchema),
  CreateCow
)

router.get('/:id', GetSingleCow)

router.patch(
  '/:id',
  validateRequest(cowValidation.updateCowZodSchema),
  UpdateCow
)

router.delete('/:id', DeleteCow)

router.get('/', getAllCow)

export const CowRoutes = router
