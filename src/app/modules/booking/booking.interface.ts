import { Types } from 'mongoose'

export interface TBooking {
  user: Types.ObjectId
  tran_id: string
  status: string
}

export interface TBookingRequest {
  amount: string
  status: string
  tran_id: string
}
