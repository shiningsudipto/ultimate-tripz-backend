import { Router } from 'express'
import { UserRoutes } from '../modules/user/user.route'
import { AuthRoutes } from '../modules/auth/auth.route'
import { BookingsRoutes } from '../modules/booking/booking.route'
import { PaymentRoutes } from '../modules/payment/payment.route'
import { PostRoutes } from '../modules/post/post.route'
import { CommentRoutes } from '../modules/comment/comment.route'

const router = Router()

const moduleRoutes = [
  {
    path: '/',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/bookings',
    route: BookingsRoutes,
  },
  {
    path: '/payment',
    route: PaymentRoutes,
  },
  {
    path: '/post',
    route: PostRoutes,
  },
  {
    path: '/comment',
    route: CommentRoutes,
  },
]

moduleRoutes.forEach((route) => router.use(route.path, route.route))

export default router
