const express = require('express')
const router = express.Router()

const station = require('../model/station')
const booking = require('../model/booking')
const user = require('../model/login')
const authMiddleware = require('../middleware/authMiddleware')


// CREATE BOOKING 
router.post('/booking', authMiddleware, async (req, res) => {
    try {
        const User = await user.findById(req.user.id)
        if (!User) return res.status(401).json("Unauthorized")

        const { stationId, date, timeSlot, vehicleNo } = req.body

        const Station = await station.findById(stationId)
        if (!Station) return res.status(404).json({ message: "Station not found" })

        if (Station.availableSlots <= 0)
            return res.status(400).json({ message: "No slots available" })


        // 🔥 ✅ VALIDATION START

        const now = new Date()
        const selectedDate = new Date(date)

        // ⛔ 1. Prevent past date
        const today = new Date()
        today.setHours(0, 0, 0, 0)

        if (selectedDate < today) {
            return res.status(400).json({ message: "Cannot book past date" })
        }

        // ⛔ 2. Prevent more than 30 days ahead
        const daysDiff = (selectedDate - now) / (1000 * 60 * 60 * 24)

        if (daysDiff > 30) {
            return res.status(400).json({ message: "Booking allowed only within 30 days" })
        }

        // ⛔ 3. Prevent past time (only for today)
        if (date === now.toISOString().split("T")[0]) {

            const start = timeSlot.split("-")[0].trim()

            let [time, modifier] = start.split(" ")
            let [hours, minutes] = time.split(":")
            hours = parseInt(hours)

            // convert AM/PM
            if (modifier === "PM" && hours !== 12) hours += 12
            if (modifier === "AM" && hours === 12) hours = 0

            const slotTime = new Date()
            slotTime.setHours(hours)
            slotTime.setMinutes(minutes)
            slotTime.setSeconds(0)

            if (slotTime < now) {
                return res.status(400).json({ message: "Selected time already passed" })
            }
        }

        // 🔥 ✅ VALIDATION END


        const Booking = await booking.create({
            user: User._id,
            station: stationId,
            date,
            timeSlot,
            vehicleNo,
            amount: Station.priceperHour,
            status: 'pending'
        })

        res.status(201).json(Booking)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// CONFIRM BOOKING (REDUCE SLOT)
router.put('/confirm/:id', authMiddleware, async (req, res) => {
    try {

        const Book = await booking.findById(req.params.id)
        console.log("Station BEFORE:", await station.findById(Book.station))

        if (!Book)
            return res.status(404).json({ message: "Booking not found" })

        if (Book.status === "confirmed")
            return res.json({ message: "Already confirmed" })

        if (Book.status !== "pending")
            return res.json({ message: "Invalid booking state" })

        // ✅ reduce slot safely
        const Station = await station.findOneAndUpdate(
            { _id: Book.station, availableSlots: { $gt: 0 } },
            { $inc: { availableSlots: -1 } },
            { new: true }
        )

        if (!Station)
            return res.status(400).json({ message: "No slots available" })

        Book.status = "confirmed"
        await Book.save()

        res.json({
            message: "Booking confirmed",
            availableSlots: Station.availableSlots
        })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// GET USER BOOKINGS + AUTO EXPIRY
router.get('/Vbooking', authMiddleware, async (req, res) => {
    try {

        const now = new Date()

        const bookings = await booking
            .find({ user: req.user.id })
            .populate("station")
            .sort({ createdAt: -1 })

            for (let b of bookings) {

    const now = new Date()

    // get END time (after "-")
    const endTime = b.timeSlot.split("-")[1].trim()

    let [time, modifier] = endTime.split(" ")
    let [hours, minutes] = time.split(":")

    hours = parseInt(hours)
    minutes = parseInt(minutes)

    // ✅ convert AM/PM to 24-hour
    if (modifier === "PM" && hours !== 12) hours += 12
    if (modifier === "AM" && hours === 12) hours = 0

    const slotEnd = new Date(b.date)
    slotEnd.setHours(hours)
    slotEnd.setMinutes(minutes)
    slotEnd.setSeconds(0)

    // ✅ AUTO CANCEL
    if (
        now > slotEnd &&
        (b.status === "pending" || b.status === "confirmed")
    ) {

        // 🔁 increase slot ONLY if confirmed
        if (b.status === "confirmed") {
            await station.findByIdAndUpdate(b.station._id || b.station, {
                $inc: { availableSlots: 1 }
            })
        }

        b.status = "cancelled"
        await b.save()

        console.log("Auto cancelled:", b._id)
    }
}
        

        res.json(bookings)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// CANCEL BOOKING
router.put('/cancel/:id', authMiddleware, async (req, res) => {
    try {

        const Book = await booking.findById(req.params.id)

        if (!Book)
            return res.status(404).json({ message: "Booking not found" })

        if (Book.user.toString() !== req.user.id)
            return res.status(403).json({ message: "Not Your Booking" })

        if (Book.status === "cancelled")
            return res.json({ message: "Already cancelled" })

        const now = new Date()

        // get slot START time
        const startTime = Book.timeSlot.split("-")[0].trim()

        let [time, modifier] = startTime.split(" ")
        let [hours, minutes] = time.split(":")

        hours = parseInt(hours)
        minutes = parseInt(minutes)

        if (modifier === "PM" && hours !== 12) hours += 12
        if (modifier === "AM" && hours === 12) hours = 0

        const slotStart = new Date(Book.date)
        slotStart.setHours(hours)
        slotStart.setMinutes(minutes)
        slotStart.setSeconds(0)

        // slot END time
        const slotEnd = new Date(slotStart)
        slotEnd.setHours(slotStart.getHours() + 1)

        let refund = 0

        // REFUND 
        if (now < slotStart) {
            refund = Book.amount // 100%
        } else if (now > slotStart && now < slotEnd) {
            refund = Book.amount * 0.5 // 50%
        } else {
            refund = 0 // no refund
        }

        // return slot if confirmed
        if (Book.status === "confirmed") {
            await station.findByIdAndUpdate(Book.station, {
                $inc: { availableSlots: 1 }
            })
        }

        Book.status = "cancelled"
        await Book.save()

        res.json({
            message: "Booking cancelled",
            refundAmount: refund
        })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// COMPLETE BOOKING
router.put('/complete/:id', authMiddleware, async (req, res) => {
    try {

        const Book = await booking.findById(req.params.id)

        if (!Book)
            return res.status(404).json({ message: "Booking not found" })

        if (Book.user.toString() !== req.user.id)
            return res.status(403).json({ message: "Not Your Booking" })

        if (Book.status === "completed")
            return res.json({ message: "Already completed" })

        // ✅ increase slot ONLY if confirmed
        if (Book.status === "confirmed") {
            await station.findByIdAndUpdate(Book.station, {
                $inc: { availableSlots: 1 }
            })
        }

        Book.status = "completed"
        await Book.save()

        res.json({ message: "Charging completed" })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// GET BOOKING DETAILS
router.get('/book/:id', authMiddleware, async (req, res) => {
    try {
        const book = await booking.findById(req.params.id)
            .populate('station')
            .populate('user')

        if (!book)
            return res.status(404).json({ message: "Booking not found" })

        res.json(book)

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})


// BOOKING COUNT
router.get('/booking-count', authMiddleware, async (req, res) => {
    try {
        const count = await booking.countDocuments({ user: req.user.id })
        res.json({ count })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get('/nearby-stations', async (req, res) => {
    try {
        const { lat, lng } = req.query

        const stations = await station.find()

        const nearby = stations.filter(s => {
            const dLat = lat - parseFloat(s.latitude)
            const dLng = lng - parseFloat(s.longitude)

            const distance = Math.sqrt(dLat * dLat + dLng * dLng)

            return distance < 0.05 // approx nearby
        })

        res.json({ count: nearby.length })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

router.get("/latest", authMiddleware, async (req, res) => {
    try {

        const Booking = await booking.findOne({
            user: req.user.id,
        })
            .populate("station", "name location") 
            .sort({ createdAt: -1 })

        if (!Booking) {
            return res.json(null)
        }

        res.json({
            ...Booking._doc,
            stationName: Booking.station?.name,
            location: Booking.station?.location,
            time: Booking.timeSlot
        })

    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Error fetching booking" })
    }
})

module.exports = router