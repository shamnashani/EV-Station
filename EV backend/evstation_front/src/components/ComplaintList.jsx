import React, { useEffect, useState } from "react"
import api from './Api'

const MyComplaints = () => {
  const [complaints, setComplaints] = useState([])

  // Fetch complaints for the logged-in user
  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await api.get("/com/mycomplaints", {
        headers: { Authorization: `Bearer ${token}` }
      })
      setComplaints(res.data)
    } catch (err) {
      alert("Failed to fetch complaints")
    }
  }

  useEffect(() => {
    fetchComplaints()
  }, [])

  // Withdraw complaint (user can cancel if within 10 minutes & status pending)
  const withdrawComplaint = async (id) => {
    try {
      const token = localStorage.getItem("token")
      await api.put(`/com/withdraw/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      })
      alert("Complaint withdrawn successfully")
      fetchComplaints()
    } catch (err) {
      alert(err.response?.data?.message || "Error withdrawing complaint")
    }
  }

  // Determine if withdraw button should be shown (pending + within 10 min)
  const canWithdraw = (createdAt, status) => {
    const diffMinutes = (new Date() - new Date(createdAt)) / (1000 * 60)
    return status === "pending" && diffMinutes <= 10
  }

  // Status color badges
  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "in-progress": return "bg-blue-100 text-blue-800"
      case "resolved": return "bg-green-100 text-green-800"
      case "withdrawn": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">My Complaints</h2>

      {complaints.length === 0 && (
        <p className="text-gray-600">You have not submitted any complaints yet.</p>
      )}

      <div className="grid gap-4">
        {complaints.map((c) => (
          <div key={c._id} className="bg-white shadow-md rounded-lg p-5">
            <p className="mb-2"><strong>Category:</strong> {c.category}</p>
            <p className="mb-2"><strong>Message:</strong> {c.message}</p>

            {/* Status Badge */}
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(c.status)}`}>
              {c.status}
            </span>

            {/* Withdraw Button */}
            {canWithdraw(c.createdAt, c.status) && (
              <button
                onClick={() => withdrawComplaint(c._id)}
                className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Withdraw
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MyComplaints
