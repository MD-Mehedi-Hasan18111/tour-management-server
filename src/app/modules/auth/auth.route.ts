import express from 'express'
import { LoginUser } from './auth.controller'
import { authValidation } from './auth.validation'
import validateRequest from '../../../middlewares/validateRequest'

const router = express.Router()

router.post('/login', validateRequest(authValidation.loginZodSchema), LoginUser)

export const AuthRoutes = router
