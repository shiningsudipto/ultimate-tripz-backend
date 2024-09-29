import { Types } from 'mongoose'

export interface TComment {
  userId: string
  name: string
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
