
import axios from "axios"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const StationAdd = () => {

  // state variables for form fields
  const [name, setname] = useState("")             // station name
  const [location, setlocation] = useState("")     // location text entered by admin
  const [latitude, setlatitude] = useState("")     // latitude from map API
  const [longitude, setlongitude] = useState("")   // longitude from map API
  const [availableSlots, setavailabeSlots] = useState("") // number of slots
  const [chargerTypes, setchargerTypes] = useState("")    // charger types
  const [priceperHour, setpriceperHour] = useState("")    // price
  const [description,setdescription] = useState("")

  const nav = useNavigate() // navigation after adding station


  // fetch coordinates from OpenStreetMap
  const fetchlocation = async () => {
    try {

      const res = await axios.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: location,     // location typed by admin
            format: "json",  // response format
            limit: 1         // return only first result
          }
        }
      )

      // if location exists
      if (res.data.length > 0) {

        setlatitude(res.data[0].lat)  // set latitude
        setlongitude(res.data[0].lon) // set longitude

      }

    } catch (err) {
      alert("Unable to fetch coordinates")
    }
  }


  // add station to backend
  const addStation = async (e) => {

    e.preventDefault() // prevent page reload

    try {

      const token = localStorage.getItem("token") // get auth token

      const res = await axios.post(
        "http://localhost:4000/station/addstation",
        {
          name,
          location,
          latitude,
          longitude,
          // convert "type1,type2" -> ["type1","type2"]
          chargerTypes: chargerTypes.split(","),

          priceperHour,
          availableSlots,
          description
        },

        {
          headers: {
            Authorization: `Bearer ${token}` // admin authorization
          }
        }
      )

      alert(res.data.message)
      nav("/adminhome") // redirect to dashboard

    } catch (err) {
      alert("Error adding station")
    }

  }


  return (

    // full page background gradient
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-6">


      {/* glassmorphism card */}
      <form
        onSubmit={addStation}
        className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-full max-w-md text-white"
      >

        {/* title */}
        <h2 className="text-2xl font-bold text-center mb-6">
          ⚡ Add Charging Station
        </h2>


        {/* station name */}
        <input
          type="text"
          placeholder="Station Name"
          value={name}
          onChange={(e) => setname(e.target.value)}

          // tailwind input style
          className="w-full mb-4 px-3 py-2 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />


        {/* location */}
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setlocation(e.target.value)}

          // fetch coordinates when user leaves input
          onBlur={fetchlocation}

          className="w-full mb-4 px-3 py-2 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />


        {/* available slots */}
        <input
          type="number"
          placeholder="Available Slots"
          value={availableSlots}
          onChange={(e) => setavailabeSlots(e.target.value)}

          className="w-full mb-4 px-3 py-2 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />


        {/* charger types */}
        <input
          type="text"
          placeholder="Charger Types (Type1,Type2,Fast)"
          value={chargerTypes}
          onChange={(e) => setchargerTypes(e.target.value)}

          className="w-full mb-4 px-3 py-2 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />


        {/* price */}
        <input
          type="number"
          placeholder="Price Per Hour"
          value={priceperHour}
          onChange={(e) => setpriceperHour(e.target.value)}

          className="w-full mb-6 px-3 py-2 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
          <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setdescription(e.target.value)}

          // tailwind input style
          className="w-full mb-4 px-3 py-2 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />


        {/* submit button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 py-2 rounded-lg font-semibold transition"
        >
          Add Station
        </button>


        {/* map preview (optional) */}
        {latitude && longitude && (
          <div className="mt-6 rounded-xl overflow-hidden">

            <iframe
              title="map"
              src={`https://maps.google.com/maps?q=${latitude},${longitude}&z=15&output=embed`}
              className="w-full h-40 border-0"
              loading="lazy"
            />

          </div>
        )}

      </form>

    </div>

  )

}

export default StationAdd

