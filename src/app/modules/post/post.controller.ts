import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'
import { TPost } from './post.interface'
import { TImageFile } from '../../interface/image.interface'
import { postServices } from './post.service'
import Post from './post.model'
import { getUserInfoFromToken } from '../../utils/getUserInfoFromToken'

const createPost = catchAsync(async (req, res) => {
  const postInfo = req.body
  const file = req.file as TImageFile
  const imagePath = file?.path
  const payload = {
    ...postInfo,
    cover: imagePath,
  }

  const result = await postServices.createPostIntoDB(payload)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post created successfully',
    data: result,
  })
})

const updatePost = catchAsync(async (req, res) => {
  const { id } = req.params
  const postInfo = req.body

  const file = req.file as TImageFile
  const imagePath = file?.path

  const payload: Partial<TPost> = {
    ...postInfo,
    ...(imagePath ? { cover: imagePath } : {}),
  }

  const result = await postServices.updatePostIntoDB(id, payload)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post updated successfully',
    data: result,
  })
})

const getAllPosts = catchAsync(async (req, res) => {
  const query = req.query
  const result = await postServices.getAllPostsFromDB(query)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Posts retrieved successfully',
    data: result,
  })
})
const getAllAcInacPosts = catchAsync(async (req, res) => {
  const result = await Post.find()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Posts retrieved successfully',
    data: result,
  })
})
const getPostsByAuthor = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await postServices.getPostsByAuthorFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Posts retrieved successfully',
    data: result,
  })
})
const getPopularPosts = catchAsync(async (req, res) => {
  const result = await Post.aggregate([
    {
      $addFields: {
        upVotesCount: { $size: '$upVotes' }, // Add a field to calculate the length of the upVotes array
      },
    },
    {
      $sort: { upVotesCount: -1 }, // Sort by the length of the upVotes array in descending order
    },
    {
      $limit: 3,
    },
    {
      $lookup: {
        from: 'users',
        localField: 'author',
        foreignField: '_id',
        as: 'author',
      },
    },
    {
      $unwind: '$author',
    },
    {
      $project: {
        images: 0,
        downVotes: 0,
        commentsCount: 0,
        category: 0,
        comments: 0,
        'author.email': 0,
        'author.followers': 0,
        __v: 0,
      },
    },
  ])

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Top 3 posts retrieved successfully',
    data: result,
  })
})
const getSinglePost = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await postServices.getSinglePostFromDB(id)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post retrieved successfully',
    data: result,
  })
})
const deletePost = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await Post.findByIdAndDelete(id)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post deleted successfully',
    data: result,
  })
})
const upVotePost = catchAsync(async (req, res) => {
  const { id } = req.params
  const token = req.headers.authorization
  const { id: userId } = getUserInfoFromToken(token as string)
  const result = await postServices.upVotePostIntoDB(id, userId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Voted successfully',
    data: result,
  })
})
const downVotePost = catchAsync(async (req, res) => {
  const { id } = req.params
  const token = req.headers.authorization
  const { id: userId } = getUserInfoFromToken(token as string)
  const result = await postServices.downVotePostIntoDB(id, userId)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Down voted successfully',
    data: result,
  })
})

export const postControllers = {
  createPost,
  getAllPosts,
  getAllAcInacPosts,
  getPostsByAuthor,
  getPopularPosts,
  getSinglePost,
  updatePost,
  deletePost,
  upVotePost,
  downVotePost,
}
