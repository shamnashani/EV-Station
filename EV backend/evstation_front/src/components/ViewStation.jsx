import React, { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import SearchBar from "./SearchBar"

const StationList = () => {

  // store all stations from backend
  const [stations, setStations] = useState([])

  // store search text
  const [search, setSearch] = useState("")

  const navigate = useNavigate()

  // fetch stations when component loads
  useEffect(() => {

    const fetchStations = async () => {

      const res = await axios.get("http://localhost:4000/station/Sview")

      // save stations to state
      setStations(res.data)
    }

    fetchStations()

  }, [])


  // filter stations based on name or location
  const filteredStations = stations.filter((st) =>
    st.name.toLowerCase().includes(search.toLowerCase()) ||
    st.location.toLowerCase().includes(search.toLowerCase())
  )


  return (

    // page background
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">

      {/* page title */}
      <h1 className="text-3xl font-bold text-white text-center mb-8">
        ⚡ Charging Stations
      </h1>

      {/* search bar */}
      <div className="max-w-xl mx-auto mb-10">
        <SearchBar search={search} setSearch={setSearch} />
      </div>


      {/* grid layout for cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

        {filteredStations.map((st) => (

          <div
            key={st._id}

            // glassmorphism card style
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl text-white hover:scale-[1.02] transition"
          >

            {/* station name */}
            <h2 className="text-xl font-semibold mb-1">
              {st.name}
            </h2>

            {/* station location */}
            <p className="text-sm text-white/70 mb-4">
              📍 {st.location}
            </p>
            <p className="text-sm text-white/80 mt-2 mb-4 italic">
            {st.description}
            </p>


            {/* station details */}
            <div className="space-y-2 text-sm">

              {/* available slots */}
              <p>
                <span className="font-semibold">Available Slots:</span>

                <span
                  className={`ml-2 px-2 py-0.5 rounded-full text-xs
                  ${
                    st.availableSlots > 0
                      ? "bg-green-500/20 text-green-300"
                      : "bg-red-500/20 text-red-300"
                  }`}
                >
                  {st.availableSlots}
                </span>
              </p>


              {/* charger types */}
              <p>
                <span className="font-semibold">Charger Type:</span>{" "}
                {st.chargerTypes?.join(", ")}
              </p>


              {/* price */}
              <p>
                <span className="font-semibold">Price:</span> ₹ {st.priceperHour} / hour
              </p>


            </div>


            {/* Google Map iframe preview */}
            <div className="mt-4 rounded-xl overflow-hidden">

              <iframe
                title="map"

                // Google Maps embed using latitude and longitude
                src={`https://maps.google.com/maps?q=${st.latitude},${st.longitude}&z=15&output=embed`}

                className="w-full h-40 border-0 rounded-lg"
                loading="lazy"
              />

            </div>


            {/* actions */}
            <div className="flex justify-between items-center mt-6">

              {/* open google maps */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${st.latitude},${st.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg hover:text-blue-300 transition"
              >
                📍 Open Map
              </a>


              {/* booking button */}
              <button
                onClick={() =>
                  navigate("/booking", {
                    state: { station: st },
                  })
                }

                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm font-semibold transition"
              >
                Book Slot
              </button>

            </div>

          </div>

        ))}

      </div>

    </div>
  )
}

export default StationList