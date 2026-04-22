import React, { useEffect, useState } from "react"
import { FaCheckCircle } from "react-icons/fa"
import api from "./Api"




const NotificationPage = () => {

  const [notifications, setNotifications] = useState([])
  const token=localStorage.getItem('token')

  useEffect(() => {
    fetchNotifications()
    const interval = setInterval(checkReminder, 60000)

  return () => clearInterval(interval)

  }, [])

  const fetchNotifications = async () => {
    try {

      const token = localStorage.getItem("token")

      const res = await api.get(
        "/booking/Vbooking",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      // ✅ MARK ALL AS READ
      localStorage.setItem("seenCount", res.data.length)

      const data = res.data.map(b => {

        let message = ""

        if (b.status === "confirmed")
         message = (
        <span className="flex items-center gap-2 text-green-600">
         <FaCheckCircle />
        Your booking is confirmed
        </span>
  )
        else if (b.status === "pending")
          message = "⏳ Waiting for payment"

        else if (b.status === "completed")
          message = "⚡ Charging completed"

        else if (b.status === "cancelled")
          message = "❌ Booking cancelled"

        return {
          id: b._id,
          station: b.station?.name,
          date: new Date(b.date).toLocaleDateString(),
          message
        }
      })

      setNotifications(data)

    } catch (err) {
      console.log(err)
    }
  }
  const checkReminder = async () => {
  try {

    const res = await api.get(
      "/booking/Vbooking",
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    const now = new Date()

    res.data.forEach(b => {

      if (b.status !== "confirmed") return

      const slotDate = new Date(b.date)

      // get start time
      const start = b.timeSlot.split("-")[0].trim()
      let [time, modifier] = start.split(" ")

      let [hours, minutes] = time.split(":")
      hours = parseInt(hours)

      // convert AM/PM
      if (modifier === "PM" && hours !== 12) hours += 12
      if (modifier === "AM" && hours === 12) hours = 0

      slotDate.setHours(hours)
      slotDate.setMinutes(minutes)

      const diff = (slotDate - now) / (1000 * 60)

      // 🔔 30 min before alert
      if (diff > 0 && diff < 30) {

        alert(`⚡ Your charging starts soon at ${b.station?.name}`)

      }

    })

  } catch (err) {
    console.log(err)
  }
}

return (
    <div className="min-h-screen bg-gray-100 p-4">

      <h2 className="text-2xl font-bold mb-6 text-center">
        🔔 Notifications
      </h2>

      {notifications.length === 0 ? (
        <p className="text-center text-gray-500">No notifications</p>
      ) : (
        <div className="space-y-4 max-w-xl mx-auto">

          {notifications.map((n) => (

            <div
              key={n.id}
              className="flex items-center gap-4 bg-white p-4 rounded-xl shadow hover:shadow-md transition"
            >

              {/* ICON */}
              <div className={`p-3 rounded-full ${n.color}`}>
                {n.icon}
              </div>

              {/* TEXT */}
              <div className="flex-1">
                <p className="font-semibold text-gray-800">
                  {n.message}
                </p>

                <p className="text-sm text-gray-500">
                  {n.station} • {n.date}
                </p>
              </div>

            </div>

          ))}

        </div>
      )}

    </div>
  )
}

export default NotificationPage