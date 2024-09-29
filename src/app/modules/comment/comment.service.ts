import { Types } from 'mongoose'
import Post from '../post/post.model'
import { TComment } from './comment.interface'
import Comment from './comment.model'

const commentIntoPost = async (id: string, payload: TComment) => {
  const post = await Post.findById(id)
  if (!post) {
    throw new Error('Post not found')
  }
  const result = await Comment.create(payload)

  return result
}
const EditCommentIntoPost = async (id: string, payload: TComment) => {
  const { userId, feedback } = payload

  const isFeedbackAvailable = await Comment.findById(id)

  if (!isFeedbackAvailable) {
    throw new Error('Comment not found')
  }
  // Compare userId with isFeedbackAvailable.userId
  const isSameUser = new Types.ObjectId(userId).equals(
    isFeedbackAvailable.userId,
  )

  if (!isSameUser) {
    throw new Error('Unauthorized: You can only edit your own comments')
  }

  const result = await Comment.findByIdAndUpdate(
    id,
    {
      feedback,
    },
    {
      new: true,
      runValidators: true,
    },
  )
  return result
}

const getCommentsByPostFromDB = async (id: string) => {
  const result = await Comment.find({ postId: id })
  return result
}

export const commentServices = {
  commentIntoPost,
  EditCommentIntoPost,
  getCommentsByPostFromDB,
}
