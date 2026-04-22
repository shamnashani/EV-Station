import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { GoogleLogin } from "@react-oauth/google";

function Login() {

  // store email input value
  const [email, setemail] = useState("");

  // store password input value
  const [password, setpassword] = useState("");

  // controls password visibility
  const [showPassword, setShowPassword] = useState(false);

  const nav = useNavigate();

  // login function triggered on form submit
  const login = async (e) => {
    e.preventDefault(); // prevent page refresh

    try {
      const res = await axios.post(
        "https://ev-station-1-tbha.onrender.com/login/loginn",
        { email, password }
      );

      console.log(res.data);

      // store JWT token for protected routes
      localStorage.setItem("role", res.data.user.role)
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("name", res.data.user.name)

      // role-based navigation
      if (res.data.user.role === "admin") {
        nav("/adminhome", { replace: true })
      } else {
        nav("/userHome");
      }

    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  // forgot password handler
  const handleForgotPassword = async () => {
    const email = prompt("Please enter your registered email for password reset:");
    if (!email) return;

    try {
      const res = await axios.post(
        "https://ev-station-1-tbha.onrender.com/login/forgot-password",
        { email }
      );
      alert(res.data.message || "Password reset link sent to your email.");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to send reset link");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 
    bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">

      {/* Main Card */}
      <div className="w-[380px] p-8 rounded-3xl 
      bg-white/10 backdrop-blur-2xl border border-white/20 
      shadow-[0_10px_40px_rgba(0,0,0,0.4)] text-white">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center mb-2 tracking-wide">
          Welcome Back
        </h2>

        <p className="text-center text-sm text-white/60 mb-6">
        Login to manage your EV charging 
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={login}>

          {/* Email input */}
          <input
            className="w-full px-4 py-3 rounded-xl bg-white/20 
            focus:outline-none focus:ring-2 focus:ring-blue-400 
            placeholder-white/60 transition"
            type="email"
            placeholder="Enter your email"
            onChange={(e) => setemail(e.target.value)}
            required
          />

          {/* Password input with show/hide */}
          <div className="relative">
            <input
              className="w-full px-4 py-3 pr-12 rounded-xl bg-white/20 
              focus:outline-none focus:ring-2 focus:ring-blue-400 
              placeholder-white/60 transition"

              // if showPassword true → text, else → password
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              onChange={(e) => setpassword(e.target.value)}
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

          {/* Login button */}
          <button
            className="w-full py-3 rounded-xl font-semibold 
            bg-gradient-to-r from-blue-500 to-cyan-500 
            hover:scale-105 hover:shadow-lg 
            transition duration-300"
          >
            Login
          </button>
        </form>

        {/* Forgot Password */}
        <p className="text-right text-sm text-white/70 mt-3">
          <button
            type="button"
            onClick={handleForgotPassword}
            className="text-blue-400 font-semibold hover:underline"
          >
            Forgot Password?
          </button>
        </p>

{/* Divider */}
<div className="flex items-center gap-2 my-4">
  <div className="flex-1 h-px bg-white/20"></div>
  <span className="text-xs text-white/50">OR CONTINUE WITH</span>
  <div className="flex-1 h-px bg-white/20"></div>
</div>

{/* Google Login */}
<div className="flex justify-center mb-4">
  <div className="w-full px-4 py-3 rounded-xl bg-white/20 
            focus:outline-none focus:ring-2 focus:ring-blue-400 
            placeholder-white/60 transition">
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        try {
          const res = await axios.post(
            "http://localhost:4000/login/google-login",
            { token: credentialResponse.credential }
          );

          // store data
          localStorage.setItem("role", res.data.user.role);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("name", res.data.user.name);

          // redirect
          if (res.data.user.role === "admin") {
            nav("/adminhome", { replace: true });
          } else {
            nav("/userHome");
          }

        } catch (err) {
          alert("Google login failed");
        }
      }}
      onError={() => alert("Google Login Failed")}
    />
  </div>
</div>

{/* Signup */}
<p className="text-center text-sm text-white/70">
  Don’t have an account?{" "}
  <Link
    to="/signup"
    className="text-blue-400 font-semibold hover:underline"
  >
    Sign up
  </Link>
</p>

      </div>
    </div>
  );
}

export default Login;