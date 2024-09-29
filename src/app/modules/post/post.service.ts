import { TComment, TPost } from './post.interface'
import Post from './post.model'

const createPostIntoDB = async (payload: TPost) => {
  const result = await Post.create(payload)
  return result
}
const getAllPostsFromDB = async () => {
  const result = await Post.find()
    .populate('author', '_id name email avatar')
    .populate({
      path: 'comments.commenter', // Specify the path to populate
      select: '_id name email avatar', // Fields to select from the commenter document
    })
  return result
}
const updatePostIntoDB = async (id: string, payload: Partial<TPost>) => {
  const result = await Post.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
  return result
}

// comment

const commentIntoPost = async (id: string, payload: TComment) => {
  const post = await Post.findById(id)
  console.log('post', post)
  if (!post) {
    throw new Error('Post not found')
  }

  // Initialize comments if it is undefined
  if (!post.comments) {
    post.comments = []
  }

  // Push the new comment into the comments array
  post.comments.push(payload)

  // Save the updated post
  const updatedPost = await post.save()

  return updatedPost
}

export const postServices = {
  createPostIntoDB,
  getAllPostsFromDB,
  updatePostIntoDB,
  commentIntoPost,
}
