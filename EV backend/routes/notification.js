const express = require('express')
const router = express.Router()
const authMiddleware=require('../middleware/authMiddleware')

router.get("/unread", authMiddleware, async (req, res) => {
  try {

    const count = await Notification.countDocuments({
      user: req.user.id,
      read: false
    })

    res.json({ count })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.put("/read", authMiddleware, async (req, res) => {
  try {

    await Notification.updateMany(
      { user: req.user.id },
      { $set: { read: true } }
    )

    res.json({ message: "All marked as read" })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
module.exports=router