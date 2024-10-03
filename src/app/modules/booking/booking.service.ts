import { Types } from 'mongoose'
import { transactionId } from '../../utils/utils'
import { initiatePayment } from '../payment/payment.utils'
import { User } from '../user/user.model'
import { TBooking, TBookingRequest } from './booking.interface'
import { Booking } from './booking.model'

const createBookingIntoDB = async (
  email: string,
  bookingData: TBookingRequest,
) => {
  //   console.log(bookingData)
  const userInfo = await User.findOne({ email })
  if (!userInfo) {
    throw new Error('User not found')
  }

  const paymentData = {
    transactionId: transactionId,
    amount: bookingData.amount,
    customerName: userInfo.name,
    customerEmail: email,
    customerPhone: userInfo.phone,
    customerAddress: userInfo.address,
    paidStatus: 'booked',
  }

  const paymentRes = await initiatePayment(paymentData)

  const customerId = new Types.ObjectId(userInfo._id)

  const newBookingData: Partial<TBooking> = {
    customer: customerId,
    vehicleType: bookingData.vehicleType,
    vehicleBrand: bookingData.vehicleBrand,
    vehicleModel: bookingData.vehicleModel,
    manufacturingYear: bookingData.manufacturingYear,
    registrationPlate: bookingData.registrationPlate,
    tran_id: transactionId,
    status: 'pending',
  }

  await Booking.create(newBookingData)

  // const populatedBooking = await Booking.findById(newBooking._id)
  //   .populate('customer', '_id name email phone address')
  //   .populate('service', '_id name description price duration isDeleted')
  //   .populate('slot', '_id service date startTime endTime isBooked')
  //   .lean()

  return paymentRes
}

export const bookingServices = {
  createBookingIntoDB,
}
