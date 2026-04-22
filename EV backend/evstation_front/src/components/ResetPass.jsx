import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaEyeSlash,FaEye } from "react-icons/fa";
import api from "./Api";

function ResetPass() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { token } = useParams();
  const nav = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        `/login/reset-password/${token}`,
        { password }
      );

      alert(res.data.message);
      nav("/login");

    } catch (err) {
      alert(err.response?.data?.message || "Invalid or expired link");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">

      <div className="w-[350px] p-8 rounded-2xl bg-white/10 backdrop-blur-xl">

        <h2 className="text-2xl font-bold text-center mb-4">
          Reset Password 
        </h2>

        <form onSubmit={handleReset} className="space-y-4">

          {/* Password input with show/hide */}
          <div className="relative">
            <input
              className="w-full px-4 py-3 pr-12 rounded-xl bg-white/20 
              focus:outline-none focus:ring-2 focus:ring-blue-400 
              placeholder-white/60 transition"

              // if showPassword true → text, else → password
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(e) =>setPassword(e.target.value)}
              required
            />

            {/* Eye icon button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-3 text-white/70 hover:text-white transition"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>
          <button
            className="w-full py-2 rounded-lg bg-green-500 hover:bg-green-600"
          >
            Reset Password
          </button>

        </form>
      </div>
    </div>
  );
}

export default ResetPass;