import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import SearchBar from './SearchBar'

const StationList = () => {
  const [stations, setStations] = useState([])
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchStations = async () => {
      const token=localStorage.getItem("token")
      const res = await axios.get('http://localhost:4000/station/Sview',
        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      )
      setStations(res.data)
    }
    fetchStations()
  }, [])

  const filteredStations = stations.filter(st =>
    st.name.toLowerCase().includes(search.toLowerCase()) ||
    st.location.toLowerCase().includes(search.toLowerCase())
  )

  return (
    
   
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">

      {/* Title */}
      <h1 className="text-3xl font-bold text-white text-center mb-8">
        ⚡ Charging Stations
      </h1>

      {/* Search */}
      <div className="max-w-xl mx-auto mb-10">
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      {/* Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredStations.map(st => (
          <div
            key={st._id}
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-xl text-white hover:scale-[1.02] transition"
          >
            {/* Station name */}
            <h2 className="text-xl font-semibold mb-1">
              {st.name}
            </h2>

            {/* Location */}
            <p className="text-sm text-white/70 mb-4">
              📍 {st.location}
            </p>

            {/* Info */}
            <div className="space-y-2 text-sm">
              <p>
                <span className="font-semibold">Available Slots:</span>{" "}
                <span
                  className={`ml-2 px-2 py-0.5 rounded-full text-xs
                  ${st.availableSlots > 0
                    ? "bg-green-500/20 text-green-300"
                    : "bg-red-500/20 text-red-300"}
                `}
                >
                  {st.availableSlots}
                </span>
              </p>

              <p>
                <span className="font-semibold">Charger Type:</span>{" "}
                {st.chargerTypes?.join(", ")}
              </p>

              <p>
                <span className="font-semibold">Price:</span>{" "}
                ₹ {st.pricePerHour} / hour
              </p>
            </div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-6">
              <button
                onClick={() =>
                  navigate("/map", {
                    state: {
                      lat: st.latitude,
                      lng: st.longitude,
                      name: st.name
                    }
                  })
                }
                className="text-lg hover:text-blue-300 transition"
              >
                📍 View Map
              </button>

              <button
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
