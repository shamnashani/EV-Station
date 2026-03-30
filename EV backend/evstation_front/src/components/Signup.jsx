import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function Signup() {

 
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const nav = useNavigate();

  // signup function
  const sign = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        "http://localhost:4000/login/signup",
        { name, email, password });

      alert("Account created successfully 🎉");
      nav("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 
    bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">

      {/* Signup Card */}
      <div className="w-[360px] p-8 rounded-3xl 
      bg-white/10 backdrop-blur-2xl border border-white/20 
      shadow-[0_10px_40px_rgba(0,0,0,0.4)] text-white">

        <h2 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h2>

        <p className="text-center text-sm text-white/60 mb-6">
          Join and start your EV experience
        </p>

        <form className="space-y-4" onSubmit={sign}>

          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-3 rounded-xl bg-white/20 
            focus:ring-2 focus:ring-cyan-400 outline-none"
            onChange={(e) => setname(e.target.value)}
            required
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-3 rounded-xl bg-white/20 
            focus:ring-2 focus:ring-cyan-400 outline-none"
            onChange={(e) => setemail(e.target.value)}
            required
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full px-4 py-3 pr-12 rounded-xl bg-white/20 
              focus:ring-2 focus:ring-cyan-400 outline-none"
              onChange={(e) => setpassword(e.target.value)}
              required
            />

            {/* show/hide */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-white/70"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Submit */}
          <button
            className="w-full py-3 rounded-xl font-semibold 
            bg-gradient-to-r from-cyan-500 to-blue-500 
            hover:scale-105 transition"
          >
            Create Account
          </button>

        </form>
        {/* Divider */}
<div className="flex items-center gap-2 my-4">
  <div className="flex-1 h-px bg-white/20"></div>
  <span className="text-xs text-white/50">OR </span>
  <div className="flex-1 h-px bg-white/20"></div>
</div>

        {/* Login Link */}
        <p className="text-center mt-4 text-sm text-white/70">
          Already have an account?{" "}
          <Link to="/login" className="text-cyan-400 font-semibold hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;