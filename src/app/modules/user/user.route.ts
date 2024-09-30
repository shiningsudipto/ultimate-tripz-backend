import express from 'express'
import auth from '../../middlewares/auth'
import { USER_ROLE } from './user.constant'
import { userControllers } from './user.controller'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidations } from './user.validation'
import { multerUpload } from '../../config/multer.config'
import { parseBody } from '../../middlewares/bodyParser'

const router = express.Router()
// user routes

router.get('/my-bookings', auth(USER_ROLE.user), userControllers.getMyBookings)
router.get('/users', auth(USER_ROLE.admin), userControllers.getAllUser)
router.get('/user-info', userControllers.getUserByEmail)
router.post('/follow', userControllers.follow)

router.put(
  '/update-user/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  multerUpload.fields([{ name: 'avatar' }]),
  parseBody,
  validateRequest(UserValidations.updateUserValidationSchema),
  userControllers.updateUser,
)

export const UserRoutes = router
