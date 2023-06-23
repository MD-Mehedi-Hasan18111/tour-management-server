import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import { adminValidation } from './admin.validation'
import { CreateAdmin, LoginAdmin } from './admin.controller'

const router = express.Router()

router.post(
  '/create-admin',
  validateRequest(adminValidation.createAdminZodSchema),
  CreateAdmin
)

router.post(
  '/login',
  validateRequest(adminValidation.loginAdminZodSchema),
  LoginAdmin
)

export const AdminRoutes = router
