import { Types } from 'mongoose'

type TCategory =
  | 'adventure'
  | 'eco-tourism'
  | 'luxury'
  | 'wellness'
  | 'cultural'
  | 'culinary'
  | 'historical'
  | 'beach'
  | 'mountain'
  | 'road trip'
  | 'travel'

export interface TComment {
  commenter: Types.ObjectId
  content: string
  _id: string
}
export interface TPost {
  title: string
  content: string
  cover: string
  tags: 'premium' | 'everyone'
  comments?: TComment[]
  commentsCount?: number
  upVotes: Types.ObjectId[]
  downVotes: Types.ObjectId[]
  author: Types.ObjectId
  category: TCategory
  isActive: boolean
}
