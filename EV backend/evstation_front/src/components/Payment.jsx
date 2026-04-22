import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import axios from "axios"

const loadScript = (src) => {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = src
    script.onload = () => resolve(true)
    script.onerror = () => resolve(false)
    document.body.appendChild(script)
  })
}

const PaymentPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  const [booking, setBooking] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!state?.bookingId) {
      alert("Invalid payment access")
      navigate("/")
      return
    }
    fetchBooking()
  }, [])

  const fetchBooking = async () => {
    try {
      const token = localStorage.getItem("token")

      const res = await axios.get(
        `https://ev-station-1-tbha.onrender.com/booking/book/${state.bookingId}`,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )

      setBooking(res.data)
    } catch (err) {
      alert("Failed to load booking")
    } finally {
      setLoading(false)
    }
  }

  const handlePayment = async () => {
    const loaded = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    )

    if (!loaded) {
      alert("Razorpay SDK failed to load")
      return
    }

    const options = {
      key: "rzp_test_MJOAVy77oMVaYv",
      amount: booking.amount * 100,
      currency: "INR",
      name: "EV Charging",
      description: "Slot Booking Payment",

handler: async function (response) {
  try {
    const token = localStorage.getItem("token")

    // payment
    await axios.post(
      "https://ev-station-1-tbha.onrender.com/pay/pay",
      {
        bookingId: booking._id,
        paymentId: response.razorpay_payment_id,
        status: "paid"
      },
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    await axios.put(
      `https://ev-station-1-tbha.onrender.com/booking/confirm/${booking._id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` }
      }
    )

    alert("Payment Successful & Slot Booked ✅")

    navigate("/vbooking")

  } catch (err) {
    console.log(err)
    alert("Payment verification failed ❌")
  }
},

      modal: {
        ondismiss: async function () {
          try {
            const token = localStorage.getItem("token")

            await axios.post(
              "https://ev-station-1-tbha.onrender.com/pay/pay",
              {
                bookingId: booking._id,
                status: "failed"
              },
              {
                headers: { Authorization: `Bearer ${token}` }
              }
            )

            alert("Payment Failed ❌")

          } catch (err) {
            console.error(err)
          }
        }
      },

      prefill: {
        name: booking.user?.name || "",
        email: booking.user?.email || "",
        contact: booking.user?.phone || ""
      },

      theme: {
        color: "#3399cc"
      }
    }

    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
  }

  if (loading) return <p>Loading...</p>
  if (!booking) return <p>Booking not found</p>


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] to-[#2c5364]">
      <div className="bg-white/10 p-8 rounded-2xl w-[350px] text-white space-y-4">
        <h2 className="text-xl font-bold text-center">💳 Payment</h2>

        <p><b>Station:</b> {booking.station?.name}</p>
        <p><b>Date:</b> {new Date(booking.date).toLocaleDateString()}</p>

        <p className="text-lg font-semibold">
          Amount: ₹{booking.amount}
        </p>

        <button
          onClick={handlePayment}
          className="w-full py-2 bg-green-600 hover:bg-green-700 rounded font-semibold"
        >
          Pay Now
        </button>
      </div>
    </div>
  )
}

export default PaymentPage
