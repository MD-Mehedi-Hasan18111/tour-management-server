import express from 'express'
import { UserRoutes } from '../app/modules/users/users.route'
import { CowRoutes } from '../app/modules/cow/cow.route'
import { AuthRoutes } from '../app/modules/auth/auth.route'
import { OrderRoutes } from '../app/modules/order/order.route'
import { AdminRoutes } from '../app/modules/admin/admin.route'

const router = express.Router()

const allRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/cows',
    route: CowRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  }
]

allRoutes.forEach(route => router.use(route.path, route.route))

export default router
