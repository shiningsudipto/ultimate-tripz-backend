import httpStatus from 'http-status'
import sendResponse from '../../utils/sendResponse'
import catchAsync from '../../utils/catchAsync'
import { TPost } from './post.interface'
import { TImageFiles } from '../../interface/image.interface'
import { postServices } from './post.service'

const createPost = catchAsync(async (req, res) => {
  const postInfo = req.body
  const files = req.files as TImageFiles
  const postImages = files?.images

  const postData: TPost = {
    ...postInfo,
    images: postImages.map((image) => image.path),
  }

  const result = await postServices.createPostIntoDB(postData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post created successfully',
    data: result,
  })
})
const getAllPosts = catchAsync(async (req, res) => {
  const result = await postServices.getAllPostsFromDB()

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Post retrieved successfully',
    data: result,
  })
})

export const postControllers = { createPost, getAllPosts }
