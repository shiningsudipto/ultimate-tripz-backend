// src/modules/booking/booking.model.ts

import { Schema, model } from 'mongoose'
import { TBooking } from './booking.interface'

const bookingSchema = new Schema<TBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    tran_id: { type: String, required: true },
    status: { type: String, default: 'pending' },
  },
  {
    timestamps: true,
  },
)

export const Booking = model<TBooking>('Booking', bookingSchema)
