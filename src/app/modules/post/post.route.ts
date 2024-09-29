import express from 'express'
import { postControllers } from './post.controller'
import { multerUpload } from '../../config/multer.config'
import { parseBody } from '../../middlewares/bodyParser'
// import auth from '../../middlewares/auth'
// import { USER_ROLE } from './user.constant'
// import validateRequest from '../../middlewares/validateRequest'
// import { UserValidations } from './user.validation'

const router = express.Router()

// post routes

router.get('/all-posts', postControllers.getAllPosts)

router.post(
  '/create-post',
  multerUpload.fields([{ name: 'images' }]),
  parseBody,
  postControllers.createPost,
)

export const PostRoutes = router
