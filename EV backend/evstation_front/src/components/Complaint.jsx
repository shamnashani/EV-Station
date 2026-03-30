import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Complaint = () => {

  const [category, setCategory] = useState("")
  const [message, setMessage] = useState("")
  const [stationName,setstationName]=useState("")
  const [loading,setLoading] = useState(false)
    const [login, setLogin] = useState(false);
  
  const nav=useNavigate()
  useEffect(()=>{
    const token = localStorage.getItem("token");
    setLogin(!!token);

  },[])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try{

      setLoading(true)

      const token = localStorage.getItem("token")
    if (!token) {
      alert("❌ Please login first to book a slot!");
      nav("/login");
      return;
    }

      await axios.post(
        "http://localhost:4000/com/create",
        { category, message ,stationName},
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      alert("Complaint submitted successfully")

      setCategory("")
      setMessage("")
      nav('/userHome')

    }catch(err){
      alert("Failed to submit complaint")
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
          <div>
            <label className="text-sm font-medium text-gray-600">
              staion Details
            </label>
          </div>


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


          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition"
          >
            {loading ? "Submitting..." : "Submit Complaint"}
          </button>
          {!login &&(
            <p className="red-text-200 text-center mt-2">Please login to submit a complaint</p>
          )}


        </form>

      </div>

    </div>

  )
}

export default Complaint