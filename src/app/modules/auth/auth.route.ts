import express from 'express'
import { ChangePassword, LoginUser } from './auth.controller'
import { authValidation } from './auth.validation'
import validateRequest from '../../../middlewares/validateRequest'

const router = express.Router()

router.post('/login', validateRequest(authValidation.loginZodSchema), LoginUser)

router.post(
  '/change-password',
  validateRequest(authValidation.changePasswordZodSchema),
  ChangePassword
)

export const AuthRoutes = router
