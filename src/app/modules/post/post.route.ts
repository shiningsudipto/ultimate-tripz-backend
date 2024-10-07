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
router.get(
  '/all-active-inactive-posts',
  auth(USER_ROLE.admin),
  postControllers.getAllAcInacPosts,
)
router.get('/posts-by-author/:id', postControllers.getPostsByAuthor)
router.get('/popular', postControllers.getPopularPosts)
router.post('/upvote/:id', postControllers.upVotePost)
router.post('/downvote/:id', postControllers.downVotePost)
router.get('/single-post/:id', postControllers.getSinglePost)
router.put(
  '/update-post/:id',
  multerUpload.single('image'),
  parseBody,
  postControllers.updatePost,
)
router.delete(
  '/delete-post/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  postControllers.deletePost,
)

router.post(
  '/create-post',
  multerUpload.single('image'),
  parseBody,
  postControllers.createPost,
)

export const PostRoutes = router
