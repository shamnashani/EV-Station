const express = require("express")
const router = express.Router()
const Complaint = require("../model/complaint")
const authMiddleware = require("../middleware/authMiddleware")
const adminMiddleware = require("../middleware/adminMiddleware") // You need to create this

// ==================== USER ROUTES ==================== //

// CREATE COMPLAINT
router.post("/create", authMiddleware, async (req, res) => {
  try {
    const { category, message } = req.body
    if (!category || !message) {
      return res.status(400).json({ message: "All fields are required" })
    }

    const complaint = await Complaint.create({
      user: req.user.id,
      stationName,
      category,
      message,
      status: "pending"
    })

    res.status(201).json({ message: "Complaint submitted successfully", complaint })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// GET USER COMPLAINTS
router.get("/mycomplaints", authMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id }).sort({ createdAt: -1 })
    res.json(complaints)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// WITHDRAW COMPLAINT (USER)
router.put("/withdraw/:id", authMiddleware, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id)

    if (!complaint) return res.status(404).json({ message: "Complaint not found" })

    if (complaint.user.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" })
    }

    if (complaint.status !== "pending") {
      return res.status(400).json({ message: "Cannot withdraw after processing" })
    }

    const diffMinutes = (new Date() - new Date(complaint.createdAt)) / (1000 * 60)
    if (diffMinutes > 10) {
      return res.status(400).json({ message: "Withdrawal time expired " })
    }

    complaint.status = "withdrawn"
    await complaint.save()

    res.json({ message: "Complaint withdrawn successfully", complaint })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
 //get leatest com
router.get("/recent", authMiddleware, async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id })
      .sort({ createdAt: -1 }).limit(5).populate("station", "name location")

    res.json(complaints)

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Error fetching complaints" })
  }
})

module.exports = router
