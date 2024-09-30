/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Model, Types } from 'mongoose'
import { USER_ROLE } from './user.constant'

export type TUser = {
  _id: string
  name: string
  email: string
  password: string
  phone: string
  role: 'admin' | 'user'
  status: 'basic' | 'premium'
  address?: string
  avatar: string
  following: Types.ObjectId[] // Use array of ObjectIds directly without wrapping in an object
  followers: Types.ObjectId[] // Same for followers
}

export type TFollow = {
  userId: Types.ObjectId
  targetedId: Types.ObjectId
}

export interface UserModel extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByEmail(email: string): Promise<TUser>
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>
}

export type TUserRole = keyof typeof USER_ROLE

export interface IBooking {
  _id: string
  customer: string // User ID
  vehicleType: string
  vehicleBrand: string
  vehicleModel: string
  manufacturingYear: number
  registrationPlate: string
  createdAt: string // ISO 8601 date string
  updatedAt: string // ISO 8601 date string
  __v: number
}

// Define the response type
export interface TGetBookingsResponse {
  success: boolean
  statusCode: number
  message: string
  data: IBooking[]
}

export type TRecoverPassword = {
  email: string
  phone: string
  password: string
}
