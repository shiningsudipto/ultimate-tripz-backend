import express from 'express'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'
import { commentControllers } from './comment.controller'

const router = express.Router()
// user routes

router.post(
  '/:id',
  auth(USER_ROLE.admin, USER_ROLE.user),
  commentControllers.postComment,
)

router.put('/update/:id', commentControllers.editPostComment)
router.get('/post/:id', commentControllers.getAllCommentsByPost)
router.delete('/delete/:id', commentControllers.deleteComment)

export const CommentRoutes = router
