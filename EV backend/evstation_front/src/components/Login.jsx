import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

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
        "http://localhost:4000/login/loginn",
        { email, password }
      );

      // store JWT token for protected routes
      localStorage.setItem("token", res.data.token);

      // role-based navigation
      if (res.data.user.role === "admin") {
        nav("/adminhome");
      } else {
        nav("/userHome");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-[#02141C] via-[#062A36] to-[#02141C]">

      {/* Glassmorphism Card */}
      <div className="w-[360px] p-8 rounded-2xl bg-white/10 backdrop-blur-xl shadow-2xl text-white">

        <h2 className="text-2xl font-semibold text-center mb-6">
          Login
        </h2>

        <form className="space-y-4" onSubmit={login}>

          {/* Email input */}
          <input
            className="w-full px-4 py-2 rounded-lg bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            placeholder="Email"
            onChange={(e) => setemail(e.target.value)}
            required
          />

          {/* Password input with show/hide */}
          <div className="relative">
            <input
              className="w-full px-4 py-2 pr-12 rounded-lg bg-white/20 focus:outline-none focus:ring-2 focus:ring-blue-500"
              
              // if showPassword true → text, else → password
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => setpassword(e.target.value)}
              required
            />

            {/* Eye icon button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-2.5 text-white/70 hover:text-white"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* Login button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition">
            Login
          </button>
        </form>

        {/* Signup link */}
        <p className="text-center mt-4 text-sm text-white/70">
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
