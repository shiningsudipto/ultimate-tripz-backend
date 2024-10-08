import { Types } from 'mongoose'
import { TPost } from './post.interface'
import Post from './post.model'
import { SortOrder } from 'mongoose'

const createPostIntoDB = async (payload: TPost) => {
  const result = await Post.create(payload)
  return result
}
interface PostQueryParams {
  searchTerm?: string
  sort?: 'date' | 'vote'
  category?: string
  tag?: string
}

const getAllPostsFromDB = async (query: PostQueryParams) => {
  const { searchTerm, sort, category, tag } = query

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const filter: any = {
    isActive: { $ne: false }, // Filter for active posts
  }

  // Search by title or content
  if (searchTerm) {
    filter.$or = [
      { title: { $regex: searchTerm, $options: 'i' } },
      { content: { $regex: searchTerm, $options: 'i' } },
    ]
  }

  // Filter by category
  if (category) {
    filter.category = category
  }

  // Filter by tag
  if (tag) {
    filter.tags = tag
  }

  // Declare sortOption as a dynamic object with SortOrder values
  let sortOption: Record<string, SortOrder> = { createdAt: -1 }

  // Sort by most votes (i.e., upVotes array length)
  if (sort === 'vote') {
    sortOption = { upVotes: -1 }
  }

  const result = await Post.find(filter)
    .populate('author', '_id name email avatar followers status')
    .sort(sortOption)
    .select({ comments: 0 })

  return result
}

const getPostsByAuthorFromDB = async (id: string) => {
  const result = await Post.find({ author: id })
    .select({ comments: 0 })
    .populate('author', '_id name avatar')
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
  const isDownVoted = postData.downVotes.includes(userObjectId)
  if (isDownVoted) {
    await Post.findByIdAndUpdate(id, {
      $pull: { downVotes: userId },
    })
  }
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
  const isUpVoted = postData.upVotes.includes(userObjectId)
  if (isUpVoted) {
    await Post.findByIdAndUpdate(id, {
      $pull: { upVotes: userId },
    })
  }
  const isVoted = postData.downVotes.includes(userObjectId)
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
  getPostsByAuthorFromDB,
  getSinglePostFromDB,
  updatePostIntoDB,
  upVotePostIntoDB,
  downVotePostIntoDB,
}
