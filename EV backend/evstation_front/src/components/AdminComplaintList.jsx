import React, { useEffect, useState } from "react"
import axios from "axios"

const AdminComplaints = () => {

  const [complaints, setComplaints] = useState([])
  const [reply, setReply] = useState({})

  const token = localStorage.getItem("token")

  // Fetch all complaints
  const fetchComplaints = async () => {
    try {

      const res = await axios.get(
        "https://ev-station-1-tbha.onrender.com/admin/getcom",
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      console.log(res.data)

      setComplaints(res.data)

    } catch (err) {
      alert("Failed to load complaints")
    }
  }

  useEffect(() => {
    fetchComplaints()
  }, [])


  // Send reply
  const sendReply = async (id) => {

    try {

      await axios.put(
        `http://localhost:4000/admin/replyComplaint/${id}`,
        { reply: reply[id] },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      alert("Reply sent successfully")

      fetchComplaints()

    } catch (err) {
      alert("Failed to send reply")
    }

  }

  return (

    <div className="min-h-screen bg-gray-100 p-6">

      <h2 className="text-2xl font-bold mb-6">
        User Complaints
      </h2>

      <div className="grid gap-4">

        {complaints.map((c) => (

          <div
            key={c._id}
            className="bg-white shadow-md rounded-lg p-5"
          >

            <p><strong>User:</strong> {c.user?.name}</p>
            <p><strong>Category:</strong>{c.category}</p>
            <p><strong>Message:</strong> {c.message}</p>

            <p className="mt-2">
              <strong>Status:</strong> {c.status}
            </p>

            {/* Admin reply if exists */}
            {c.adminReply && (
              <p className="mt-2 text-green-700">
                <strong>Admin Reply:</strong> {c.adminReply}
              </p>
            )}

            {/* Reply box */}
            {c.status !== "resolved" && (

              <div className="mt-3">

                <textarea
                  placeholder="Write reply..."
                  value={reply[c._id] || ""}
                  onChange={(e) =>
                    setReply({
                      ...reply,
                      [c._id]: e.target.value
                    })
                  }
                  className="border p-2 rounded w-full"
                />

                <button
                  onClick={() => sendReply(c._id)}
                  className="mt-2 bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Send Reply
                </button>

              </div>

            )}

          </div>

        ))}

      </div>

    </div>

  )

}

export default AdminComplaints