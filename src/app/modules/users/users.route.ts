import express from 'express'
import validateRequest from '../../../middlewares/validateRequest'
import { userValidation } from './user.validation'
import { DeleteUser, GetAllUsers, GetSingleUser, UpdateUsers } from './users.controller'

const router = express.Router()

router.patch('/:id', validateRequest(userValidation.updateUserZodSchema), UpdateUsers)

router.get('/:id', GetSingleUser)

router.delete('/:id', DeleteUser)

router.get('/', GetAllUsers)

export const UserRoutes = router
