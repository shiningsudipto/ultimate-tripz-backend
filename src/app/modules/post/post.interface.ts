import { Types } from 'mongoose'

export interface TComment {
  commenter: Types.ObjectId
  content: string
  _id: string
}
export interface TPost {
  title: string
  content: string
  images?: string[]
  tags: 'premium' | 'everyone'
  comments?: TComment[]
  commentsCount?: number
  upVotes: Types.ObjectId[]
  downVotes: Types.ObjectId[]
  author: Types.ObjectId
}
