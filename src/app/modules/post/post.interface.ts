import { Types } from 'mongoose'

export interface TComment {
  commenter: Types.ObjectId
  content: string
}
export interface TPost {
  title: string
  content: string
  images?: string[]
  tags: 'premium' | 'everyone'
  comments?: TComment[]
  upVotes?: number
  downVotes?: number
  author: Types.ObjectId
}
