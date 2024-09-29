import express from 'express'
import { AuthControllers } from './auth.controller'
import validateRequest from '../../middlewares/validateRequest'
import { AuthValidation } from './auth.validation'
import { userControllers } from '../user/user.controller'
import { UserValidations } from '../user/user.validation'
import { multerUpload } from '../../config/multer.config'
import validateImageFileRequest from '../../middlewares/validateImageFileRequest'
import { ImageFilesArrayZodSchema } from '../../zod/image.validation'
import { parseBody } from '../../middlewares/bodyParser'

const router = express.Router()

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
)
router.post(
  '/registration',
  multerUpload.fields([{ name: 'avatar' }]),
  validateImageFileRequest(ImageFilesArrayZodSchema),
  parseBody,
  validateRequest(UserValidations.createUserValidationSchema),
  userControllers.createUser,
)

export const AuthRoutes = router
