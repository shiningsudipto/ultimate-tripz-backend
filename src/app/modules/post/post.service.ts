import { TPost } from './post.interface'
import Post from './post.model'

const createPostIntoDB = async (payload: TPost) => {
  const result = await Post.create(payload)
  return result
}
const getAllPostsFromDB = async () => {
  const result = await Post.find().populate('author', '_id name email avatar')
  return result
}

export const postServices = {
  createPostIntoDB,
  getAllPostsFromDB,
}
