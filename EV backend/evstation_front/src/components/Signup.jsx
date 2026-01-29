import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Signup() {
    const [name,setname]=useState('')
    const [email,setemail]=useState('')
    const [password,setpassword]=useState('')
    const [phone,setphone]=useState()
    const [address,setaddress]=useState('')
    const [photo,setphoto]=useState('')
    
    const nav=useNavigate()
    const sign=async(e)=>{
        e.preventDefault()
        await axios.post('http://localhost:4000/login/signup',{name,email,password,phone,address,photo},{headers:{"Content-Type":"multipart/form-data"}})
        nav()

    }
  return (
      <div className="min-h-screen flex items-center justify-center px-4 
bg-gradient-to-br from-[#02141C] via-[#062A36] to-[#02141C]">

  {/* Signup Card */}
  <div className="w-full max-w-2xl backdrop-blur-lg bg-white/10 
  border border-white/20 rounded-2xl shadow-2xl p-8 text-white">

    <h2 className="text-3xl font-bold text-center mb-2">
      Create Account
    </h2>

    <p className="text-center text-gray-300 mb-8">
      Join EV Booking to reserve charging slots easily.
    </p>

    {/* Form */}
    <form className="space-y-2" onSubmit={sign}>

      {/* Full Name */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <label className="text-gray-300">Full Name</label>
        <input
          type="text"
          className="md:col-span-2 w-full px-4 py-3 bg-transparent 
          border border-white/30 rounded-lg text-white 
          focus:ring-2 focus:ring-cyan-400 outline-none"
          placeholder="Enter your name"
          onChange={(e) => setname(e.target.value)}
        />
      </div>

      {/* Email */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <label className="text-gray-300">Email</label>
        <input
          type="email"
          className="md:col-span-2 w-full px-4 py-3 bg-transparent 
          border border-white/30 rounded-lg text-white 
          focus:ring-2 focus:ring-cyan-400 outline-none"
          placeholder="Enter your email"
          onChange={(e) => setemail(e.target.value)}
        />
      </div>

      {/* Password */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <label className="text-gray-300">Password</label>
        <input
          type="password"
          className="md:col-span-2 w-full px-4 py-3 bg-transparent 
          border border-white/30 rounded-lg text-white 
          focus:ring-2 focus:ring-cyan-400 outline-none"
          placeholder="Create a password"
          onChange={(e) => setpassword(e.target.value)}
        />
      </div>

      {/* Phone */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center">
        <label className="text-gray-300 mb-1">Phone</label>
        <input
          type="number"
          className="md:col-span-2 w-full px-4 py-3 bg-transparent 
          border border-white/30 rounded-lg text-white 
          focus:ring-2 focus:ring-cyan-400 outline-none"
          placeholder="Enter your number"
          onChange={(e) => setphone(e.target.value)}
        />
      </div>

      {/* Address */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <label className="text-gray-300">Address</label>
        <input
          type="text"
          className="md:col-span-2 w-full px-4 py-3 bg-transparent 
          border border-white/30 rounded-lg text-white 
          focus:ring-2 focus:ring-cyan-400 outline-none"
          placeholder="Enter your address"
          onChange={(e) => setaddress(e.target.value)}
        />
      </div>

      {/* Photo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
        <label className="text-gray-300">Photo</label>
        <input
          type="file"
          className="md:col-span-2 w-full px-4 py-2 bg-transparent 
          border border-white/30 rounded-lg text-white 
          focus:ring-2 focus:ring-cyan-400 outline-none"
          onChange={(e) => setphoto(e.target.files[0])}
        />
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600 
        text-white py-3 rounded-lg font-semibold transition"
      >
        Create Account
      </button>

    </form>

    {/* Login Link */}
    <p className="text-center text-gray-300 mt-6">
      Already have an account?{" "}
      <a href="/login" className="text-cyan-400 font-semibold hover:underline">
        Login
      </a>
    </p>

  </div>
</div>

  )
}

export default Signup