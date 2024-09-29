import express from 'express'
import { postControllers } from './post.controller'
import { multerUpload } from '../../config/multer.config'
import { parseBody } from '../../middlewares/bodyParser'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'
// import validateRequest from '../../middlewares/validateRequest'
// import { UserValidations } from './user.validation'

const router = express.Router()

// post routes

router.get('/all-posts', postControllers.getAllPosts)
router.put(
  '/update-post/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  postControllers.updatePost,
)
router.post(
  '/comment/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  postControllers.postComment,
)
router.delete(
  '/delete-post/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  postControllers.deletePost,
)

router.post(
  '/create-post',
  multerUpload.fields([{ name: 'images' }]),
  parseBody,
  postControllers.createPost,
)

export const PostRoutes = router
