import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import { adminValidation } from './admin.validation'
import { CreateAdmin } from './admin.controller'

const router = express.Router()

router.post(
  '/create-admin',
  validateRequest(adminValidation.createAdminZodSchema),
  CreateAdmin
)

export const AdminRoutes = router
