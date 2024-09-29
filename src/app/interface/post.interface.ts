import { Types, Document } from 'mongoose'

export interface TComment {
  userId: string
  content: string
  createdAt: Date
}

export interface TAuthor {
  _id: Types.ObjectId
  email: string
}

export interface TPost extends Document {
  _id: Types.ObjectId
  title: string
  content: string
  images?: string[]
  tags: 'premium' | 'everyone'
  upVotes: number
  downVotes: number
  author: Types.ObjectId | TAuthor // `author` can be ObjectId or populated TAuthor
  comments?: TComment[]
  createdAt: Date
  updatedAt: Date
}

export interface TPopulatedPost extends Omit<TPost, 'author'> {
  author: TAuthor // In this case, the author is populated, so it's of type TAuthor
}
