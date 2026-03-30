import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Menu from "./Menu"
import Footer from "./Footer"
import AOS from "aos"
import "aos/dist/aos.css"
import axios from "axios"
const UserHome = () => {

  const userName = localStorage.getItem("name") || "User"
  const [bookingCount, setBookingCount] = useState(0)
  const [stationCount, setStationCount] = useState(0)
  const [latestBooking, setLatestBooking] = useState()


  useEffect(() => {

    AOS.init({
      duration: 900,
      once: true
    })

    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token")

        const bookingRes = await axios.get(
          "http://localhost:4000/booking/booking-count",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )


        setBookingCount(bookingRes.data.count)

      } catch (err) {
        console.log(err)
      }
    }

    fetchData()

  }, [])

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported")
      return
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude
          const lng = pos.coords.longitude



          const res = await axios.get(
            `http://localhost:4000/booking/nearby-stations?lat=${lat}&lng=${lng}`
          )

          setStationCount(res.data.count)
          console.log(res.data)
          console.log(lat, lng)

        } catch (err) {
          console.log(err)
        }
      },
      (err) => {
        console.log("Location permission denied")

        setStationCount("N/A")
      }
    )
  }, [])

  useEffect(() => {
    const fetchLatestBooking = async () => {
      try {
        const token = localStorage.getItem("token")

        const res = await axios.get(
          "http://localhost:4000/booking/latest",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )

        setLatestBooking(res.data)
        console.log(res.data)

      } catch (err) {
        console.log(err)
      }
    }

    fetchLatestBooking()
  }, [])

  return (
    <>
      <Menu />

      <div className="min-h-screen bg-gray-100 pt-16">

        {/* HERO SECTION */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-16">
          <div className="max-w-6xl mx-auto px-6 text-center">

            <h1 className="text-4xl md:text-5xl font-bold" data-aos="fade-down">
             Let’s plan your next charge ⚡, {userName}
            </h1>

            <p className="text-gray-300 mt-3" data-aos="fade-down" data-aos-delay="100">
              Plan your EV charging, book stations easily and travel without range worries.
            </p>

            <div className="mt-8" data-aos="fade-up" data-aos-delay="200">
              <Link
                to="/vStation"
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow"
              >
                Find Charging Stations
              </Link>
            </div>

          </div>
        </div>


        {/* QUICK STATS */}
        <div className="max-w-6xl mx-auto px-6 mt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

            <div className="bg-white p-5 rounded-xl shadow text-center" data-aos="fade-up">
              <h3 className="text-xl font-bold">{bookingCount}</h3>
              <p className="text-sm text-gray-500">Bookings</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow text-center" data-aos="fade-up" data-aos-delay="100">
              <h3 className="text-xl font-bold">{stationCount}</h3>
              <p className="text-sm text-gray-500">Stations Nearby</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow text-center" data-aos="fade-up" data-aos-delay="200">
              <h3 className="text-xl font-bold">24/7</h3>
              <p className="text-sm text-gray-500">Access</p>
            </div>

            <div className="bg-white p-5 rounded-xl shadow text-center" data-aos="fade-up" data-aos-delay="300">
              <h3 className="text-xl font-bold">Fast</h3>
              <p className="text-sm text-gray-500">Charging</p>
            </div>

          </div>
        </div>


        {/* YOUR ACTIVITY */}
        <div className="max-w-6xl mx-auto px-6 mt-16">

          <h2 className="text-2xl font-bold text-gray-800 mb-8" data-aos="fade-up">
            Your Activity
          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">

              <h3 className="font-semibold text-lg mb-2">
                Upcoming Booking
              </h3>

              {latestBooking ? (
                <>
                  {/* STATUS MESSAGE */}
                  {latestBooking.status === "confirmed" && (
                    <p className="text-green-600 text-sm font-medium">
                      ✅ You have a confirmed booking
                    </p>
                  )}

                  {latestBooking.status === "pending" && (
                    <p className="text-yellow-600 text-sm font-medium">
                      ⏳ Complete payment to confirm your booking
                    </p>
                  )}

                  {latestBooking.status === "completed" && (
                    <p className="text-blue-600 text-sm font-medium">
                      ✔️ Your last booking is completed
                    </p>
                  )}

                  {latestBooking.status === "cancelled" && (
                    <p className="text-red-600 text-sm font-medium">
                      ❌ Your booking was cancelled
                    </p>
                  )}

                  {/* ACTION BUTTONS */}
                  <div className="flex gap-4 mt-3">
                    <Link
                      to="/vbooking"
                      className="text-green-600 text-sm font-medium"
                    >
                      View Details →
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-gray-500 text-sm">
                    🚫 You have no bookings yet
                  </p>

                  <div className="flex gap-4 mt-3">
                    <Link
                      to="/vStation"
                      className="text-green-600 text-sm font-medium"
                    >
                      Book a station →
                    </Link>
                  </div>
                </>
              )}

            </div>


            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition" data-aos="fade-up" data-aos-delay="150">
              <h3 className="font-semibold text-lg mb-2">
                Nearby Stations
              </h3>

              <p className="text-gray-500 text-sm">
                Find charging stations near your location.
              </p>

              <Link
                to="/vStation"
                className="inline-block mt-4 text-green-600 text-sm font-medium"
              >
                Explore Stations →
              </Link>
            </div>

          </div>

        </div>


        {/* EV TIPS */}
        <div className="max-w-5xl mx-auto px-6 mt-20" data-aos="fade-up">
          <div className="bg-white rounded-xl shadow p-10">

            <h2 className="text-2xl font-bold mb-4">
              💡 EV Charging Tips
            </h2>

            <p className="text-gray-500 mb-6">
              Small habits that improve battery life and charging efficiency.
            </p>

            <ul className="space-y-4 text-gray-700">
              <li className="flex gap-3">🔋 Charge before 20%</li>
              <li className="flex gap-3">⏰ Book early during peak hours</li>
              <li className="flex gap-3">📍 Check stations before trips</li>
              <li className="flex gap-3">⚡ Avoid too much fast charging</li>
            </ul>

          </div>
        </div>


        {/* HIGHLIGHTS */}
        <div className="max-w-6xl mx-auto mt-20 mb-24 px-6">

          <h2 className="text-2xl font-bold text-center mb-12" data-aos="fade-up">
            EV Charging Highlights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

            <div className="bg-gray-900 text-white p-8 rounded-2xl shadow-lg" data-aos="flip-left">
              <h3 className="text-xl font-semibold mb-2">Smart Charging</h3>
              <p className="text-sm opacity-80">Book slots and avoid waiting</p>
              <div className="mt-6 text-3xl font-bold">24/7</div>
            </div>

            <div className="bg-white border-l-4 border-gray-800 p-8 rounded-2xl shadow-lg" data-aos="flip-up">
              <h3 className="text-xl font-semibold mb-2">Easy Navigation</h3>
              <p className="text-gray-600 text-sm">Locate stations instantly</p>
              <div className="mt-6 text-3xl font-bold">100+</div>
            </div>

            <div className="bg-white border-t-4 border-gray-800 p-8 rounded-2xl shadow-lg" data-aos="flip-right">
              <h3 className="text-xl font-semibold mb-2">Secure Platform</h3>
              <p className="text-gray-600 text-sm">Safe and reliable booking</p>
              <div className="mt-6 text-3xl font-bold">Safe</div>
            </div>

          </div>

        </div>

      </div>

      <Footer />
    </>
  )
}

export default UserHome