import React, { useEffect, useState } from "react"
import axios from "axios"

const AdminComplaints = () => {
  const [complaints, setComplaints] = useState([])

  const fetchComplaints = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await axios.get("http://localhost:4000/com/all", {
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

  // Update status of complaint
  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token")
      await axios.put(`http://localhost:4000/com/update-status/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchComplaints()
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update status")
    }
  }

  // Delete complaint
  const deleteComplaint = async (id) => {
    try {
      const token = localStorage.getItem("token")
      await axios.delete(`http://localhost:4000/com/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchComplaints()
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete complaint")
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-800"
      case "in-progress": return "bg-blue-100 text-blue-800"
      case "resolved": return "bg-green-100 text-green-800"
      case "rejected": return "bg-red-100 text-red-800"
      default: return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-6">All Complaints (Admin)</h2>

      {complaints.length === 0 && (
        <p className="text-gray-600">No complaints found.</p>
      )}

      <div className="grid gap-4">
        {complaints.map((c) => (
          <div key={c._id} className="bg-white shadow-md rounded-lg p-5">
            <p className="mb-1"><strong>User:</strong> {c.user?.name} ({c.user?.email})</p>
            <p className="mb-2"><strong>Category:</strong> {c.category}</p>
            <p className="mb-2"><strong>Message:</strong> {c.message}</p>

            {/* Status Badge */}
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(c.status)}`}>
              {c.status}
            </span>

            {/* Admin actions */}
            <div className="mt-2 flex gap-2">
              <select
                value={c.status}
                onChange={(e) => updateStatus(c._id, e.target.value)}
                className="border px-2 py-1 rounded"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In-Progress</option>
                <option value="resolved">Resolved</option>
                <option value="rejected">Rejected</option>
              </select>

              <button
                onClick={() => deleteComplaint(c._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminComplaints
