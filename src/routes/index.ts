import express from 'express'
import { UserRoutes } from '../app/modules/user/user.route'
import { AuthRoutes } from '../app/modules/auth/auth.route'

const router = express.Router()

const allRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
]

allRoutes.forEach(route => router.use(route.path, route.route))

export default router
