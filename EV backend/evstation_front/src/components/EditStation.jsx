import api from './Api'
import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom" // EDIT

const EditStation = () => {

  const { id } = useParams() // EDIT: get station id from URL

  const [name, setname] = useState("")
  const [location, setlocation] = useState("")
  const [latitude, setlatitude] = useState("")
  const [longitude, setlongitude] = useState("")
  const [availableSlots, setavailabeSlots] = useState("")
  const [chargerTypes, setchargerTypes] = useState("")
  const [priceperHour, setpriceperHour] = useState("")
  const [description,setdescription] = useState("")

  const nav = useNavigate()


  // ===============================
  // LOAD EXISTING STATION DATA
  // ===============================
  const getStation = async () => { // EDIT

    try {
      const token=localStorage.getItem("token")

      const res = await api.get(`/admin/station/${id}`,
        {headers:{
          Authorization:`Bearer ${token}`
        }}
      )

      const s = res.data.Station

      setname(s.name)
      setlocation(s.location)
      setlatitude(s.latitude)
      setlongitude(s.longitude)
      setavailabeSlots(s.availableSlots)
      setchargerTypes(s.chargerTypes.join(",")) // convert array -> string
      setpriceperHour(s.priceperHour)
      setdescription(s.description)

    } catch (err) {
      console.log(err)
    }

  }


  useEffect(() => { // EDIT
    getStation()
  }, [])



  // ===============================
  // FETCH COORDINATES
  // ===============================
  const fetchlocation = async () => {

    try {

      const res = await api.get(
        "https://nominatim.openstreetmap.org/search",
        {
          params: {
            q: location,
            format: "json",
            limit: 1
          }
        }
      )

      if (res.data.length > 0) {

        setlatitude(res.data[0].lat)
        setlongitude(res.data[0].lon)

      }

    } catch (err) {
      alert("Unable to fetch coordinates")
    }

  }



  // ===============================
  // UPDATE STATION
  // ===============================
  const updateStation = async (e) => { // EDIT

    e.preventDefault()

    try {

      const token = localStorage.getItem("token")

      await api.put( // EDIT
        `/admin/updateStation/${id}`,
        {
          name,
          location,
          latitude,
          longitude,
          chargerTypes: chargerTypes.split(","),
          priceperHour,
          availableSlots,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert("Station Updated Successfully")

      nav("/managestation") // EDIT

    } catch (err) {
      alert("Error updating station")
    }

  }


  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] p-6">

      <form
        onSubmit={updateStation} // EDIT
        className="bg-white/10 backdrop-blur-xl p-8 rounded-2xl shadow-xl w-full max-w-md text-white"
      >

        <h2 className="text-2xl font-bold text-center mb-6">
          ✏️ Edit Charging Station
        </h2>


        <input
          type="text"
          placeholder="Station Name"
          value={name}
          onChange={(e) => setname(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />


        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setlocation(e.target.value)}
          onBlur={fetchlocation}
          className="w-full mb-4 px-3 py-2 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />


        <input
          type="number"
          placeholder="Available Slots"
          value={availableSlots}
          onChange={(e) => setavailabeSlots(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />


        <input
          type="text"
          placeholder="Charger Types (Type1,Type2,Fast)"
          value={chargerTypes}
          onChange={(e) => setchargerTypes(e.target.value)}
          className="w-full mb-4 px-3 py-2 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />


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
          className="w-full mb-6 px-3 py-2 rounded-lg bg-white/20 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />


        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 py-2 rounded-lg font-semibold transition"
        >
          Update Station
        </button>


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

export default EditStation