const mongoose = require("mongoose")

const notificationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "login" },
  message: String,
  read: { type: Boolean, default: false }, // ✅ IMPORTANT
  createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model("Notification", notificationSchema)