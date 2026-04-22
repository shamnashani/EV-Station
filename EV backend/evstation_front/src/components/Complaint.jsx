import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate, useLocation } from "react-router-dom"

const Complaint = () => {
  const [category, setCategory] = useState("")
  const [message, setMessage] = useState("")
  const [stationName, setStationName] = useState("")
  const [loading, setLoading] = useState(false)
  const [login, setLogin] = useState(false)

  const nav = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const token = localStorage.getItem("token")
    setLogin(!!token)

    // ✅ 1. Auto-fill from navigation (Booking page)
    if (location.state?.stationName) {
      setStationName(location.state.stationName)
    }

    // ✅ 2. Fallback: Fetch latest booking
    const fetchLatestBooking = async () => {
      try {
        const res = await axios.get(
          "https://ev-station-1-tbha.onrender.com/booking/latest",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )

        if (!stationName) {
          setStationName(res.data.stationName)
        }
      } catch (err) {
        console.log("No booking found")
      }
    }

    if (token && !location.state?.stationName) {
      fetchLatestBooking()
    }
  }, [location.state])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const token = localStorage.getItem("token")

      if (!token) {
        alert("❌ Please login first to submit complaint!")
        nav("/login")
        return
      }

      await axios.post(
        "https://ev-station-1-tbha.onrender.com/com/create",
        { category, message, stationName },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      alert("✅ Complaint submitted successfully")

      setCategory("")
      setMessage("")
      setStationName("")

      nav("/userHome")
    } catch (err) {
      alert("❌ Failed to submit complaint")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-2xl w-full max-w-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Raise a Complaint
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Category */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Complaint Category
            </label>

            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              className="w-full border border-gray-300 p-3 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option>Payment Issue</option>
              <option>Charging Station Problem</option>
              <option>Refund Request</option>
              <option>Slot Booking Issue</option>
              <option>Other</option>
            </select>
          </div>

          {/* Station Details (Auto-filled) */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Station Details
            </label>

            <input
              type="text"
              value={stationName}
              readOnly
              placeholder="Auto-filled from booking"
              className="w-full border border-gray-300 p-3 mt-1 rounded-lg bg-gray-100"
            />
          </div>

          {/* Message */}
          <div>
            <label className="text-sm font-medium text-gray-600">
              Message
            </label>

            <textarea
              placeholder="Describe your issue..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows="4"
              className="w-full border border-gray-300 p-3 mt-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>

          {/* Login warning */}
          {!login && (
            <p className="text-red-500 text-center mt-2">
              Please login to submit a complaint
            </p>
          )}

        </form>
      </div>
    </div>
  )
}

export default Complaint