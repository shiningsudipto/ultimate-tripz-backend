import { Types } from 'mongoose'
import { TPost } from './post.interface'
import Post from './post.model'

const createPostIntoDB = async (payload: TPost) => {
  const result = await Post.create(payload)
  return result
}
const getAllPostsFromDB = async () => {
  const result = await Post.find()
    .populate('author', '_id name email avatar')
    .select({ comments: 0 })
  return result
}
const updatePostIntoDB = async (id: string, payload: Partial<TPost>) => {
  const result = await Post.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}
const getSinglePostFromDB = async (id: string) => {
  const post = await Post.findById(id)
    .populate('author', '_id name email avatar')
    .populate({
      path: 'comments.commenter',
      select: '_id name email avatar',
    })
  if (!post) {
    throw new Error('Post not found')
  }
  return post
}
const upVotePostIntoDB = async (id: string, userId: string) => {
  const postData = await Post.findById(id)
  if (!postData) {
    throw new Error('Post not available!')
  }
  const userObjectId = new Types.ObjectId(userId)
  const isVoted = postData.upVotes.includes(userObjectId)
  if (isVoted) {
    const result = await Post.findByIdAndUpdate(id, {
      $pull: { upVotes: userId },
    })
    return result
  } else {
    const result = await Post.findByIdAndUpdate(id, {
      $push: { upVotes: userId },
    })
    return result
  }
}
const downVotePostIntoDB = async (id: string, userId: string) => {
  const postData = await Post.findById(id)
  if (!postData) {
    throw new Error('Post not available!')
  }
  const userObjectId = new Types.ObjectId(userId)
  const isVoted = postData.upVotes.includes(userObjectId)
  if (isVoted) {
    const result = await Post.findByIdAndUpdate(id, {
      $pull: { downVotes: userId },
    })
    return result
  } else {
    const result = await Post.findByIdAndUpdate(id, {
      $push: { downVotes: userId },
    })
    return result
  }
}

export const postServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  getSinglePostFromDB,
  updatePostIntoDB,
  upVotePostIntoDB,
  downVotePostIntoDB,
}
