import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { commentServices } from './comment.service'

// comment
const postComment = catchAsync(async (req, res) => {
  const { id } = req.params
  const payload = req.body
  const result = await commentServices.commentIntoPost(id, payload)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Commented successfully',
    data: result,
  })
})
const editPostComment = catchAsync(async (req, res) => {
  const { id } = req.params
  const payload = req.body
  const result = await commentServices.EditCommentIntoPost(id, payload)
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Comment updated successfully',
    data: result,
  })
})

export const commentControllers = {
  postComment,
  editPostComment,
}
