const express = require('express')
const router = express.Router()
const Payment = require('../model/payment')
const Booking = require('../model/booking')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/pay', authMiddleware, async (req, res) => {
  try {
    const { bookingId, paymentId, status } = req.body

    const booking = await Booking.findById(bookingId)

    if (!booking)
      return res.status(404).json({ message: "Booking not found" })

    const existingPayment = await Payment.findOne({ booking: bookingId })
    if (existingPayment)
      return res.status(400).json({ message: "Payment already processed" })

    const payment = await Payment.create({
      booking: bookingId,
      user: req.user.id,
      amount: booking.amount,
      transactionId: paymentId || null,
      status: status
    })

    res.json({
      message: `Payment ${status}`,
      payment
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

module.exports = router
