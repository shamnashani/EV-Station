import React, { useState } from "react";
import axios from "axios";

function ForgotPass() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:4000/login/forgot-password",
        { email }
      );

      alert(res.data.message);

    } catch (err) {
      alert(err.response?.data?.message || "Error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] text-white">

      <div className="w-[350px] p-8 rounded-2xl bg-white/10 backdrop-blur-xl">

        <h2 className="text-2xl font-bold text-center mb-4">
          Forgot Password 🔐
        </h2>

        <p className="text-sm text-white/70 text-center mb-4">
          Enter your registered email
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 rounded-lg bg-white/20 outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <button
            className="w-full py-2 rounded-lg bg-blue-500 hover:bg-blue-600"
          >
            Send Reset Link
          </button>

        </form>
      </div>
    </div>
  );
}

export default ForgotPass;