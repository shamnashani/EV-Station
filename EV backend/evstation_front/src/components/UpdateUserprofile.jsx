import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from './Api'

const UpdateUserprofile = () => {

  const [name,setname]=useState('')
  const [address,setaddress]=useState('')
  const [phone,setphone]=useState('')
  const [photo,setphoto]=useState('')
  const [preview,setPreview]=useState('')

  const [loading,setLoading]=useState(false)
  const [showToast,setShowToast]=useState(false)

  const nav=useNavigate()

  useEffect(()=>{
    const fetchdata=async()=>{
      const token=localStorage.getItem('token')

      const res=await api.get(
        '/user/userprofile',
        { headers:{Authorization:`Bearer ${token}`} }
      )

      setname(res.data.name)
      setaddress(res.data.address)
      setphone(res.data.phone)

      if(res.data.photo){
        setPreview(`https://ev-station-1-tbha.onrender.com/${res.data.photo}`)
      }
    }

    fetchdata()
  },[])

  // image preview
  const handlePhoto = (e) => {
    const file = e.target.files[0]
    setphoto(file)

    if(file){
      setPreview(URL.createObjectURL(file))
    }
  }

  // update profile
  const edit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const token = localStorage.getItem("token")

    try {

      const formData = new FormData()
      formData.append("name", name)
      formData.append("address", address)
      formData.append("phone", phone)

      if(photo){
        formData.append("photo", photo)
      }

      await api.post(
        "/user/updateprofile",
        formData,
        { headers:{Authorization:`Bearer ${token}`} }
      )

      // show success popup
      setShowToast(true)

      setTimeout(()=>{
        setShowToast(false)
        nav('/userprofile')
      },2000)

    } catch (err) {
      alert(err.response?.data?.message || "Update failed")
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#02141C] via-[#062A36] to-[#02141C]">

      {/* SUCCESS TOAST */}
      {showToast && (
        <div className="fixed top-6 right-6 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-bounce">
          ✅ Profile Updated Successfully
        </div>
      )}

      {/* CARD */}
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 text-white animate-fadeIn">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Edit Profile
        </h2>

        {/* IMAGE */}
        <div className="flex justify-center mb-6">
          <label className="cursor-pointer group relative">

            <img
              src={preview || "https://via.placeholder.com/120"}
              alt="profile"
              className="w-24 h-24 rounded-full object-cover border-4 border-white/30 shadow group-hover:scale-105 transition"
            />

            {/* overlay */}
            <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center text-sm">
              Change
            </div>

            <input
              type="file"
              onChange={handlePhoto}
              className="hidden"
            />

          </label>
        </div>

        {/* FORM */}
        <form onSubmit={edit} className="space-y-5">

          <input
            type="text"
            value={name}
            onChange={(e)=>setname(e.target.value)}
            placeholder="Name"
            className="w-full px-4 py-2 rounded-lg bg-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition"
          />

          <input
            type="text"
            value={address}
            onChange={(e)=>setaddress(e.target.value)}
            placeholder="Address"
            className="w-full px-4 py-2 rounded-lg bg-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition"
          />

          <input
            type="text"
            value={phone}
            onChange={(e)=>setphone(e.target.value)}
            placeholder="Phone"
            className="w-full px-4 py-2 rounded-lg bg-white/20 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition"
          />

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-lg font-medium transition ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-cyan-500 hover:bg-cyan-600"
            }`}
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>

        </form>

      </div>
    </div>
  )
}

export default UpdateUserprofile