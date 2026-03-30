import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserProfile = () => {

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {

        const token = localStorage.getItem("token");

        if (!token) {
          window.location.href = "/login";
          return;
        }

        const res = await axios.get(
          "http://localhost:4000/user/userprofile",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );

        setUser(res.data);

      } catch (error) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    };

    fetchProfile();
  }, []);

  // loading screen
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#02141C] text-white">
        <p className="animate-pulse">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#02141C] via-[#062A36] to-[#02141C] flex items-center justify-center px-4">

      {/* MAIN CARD */}
      <div className="w-full max-w-3xl bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden text-white animate-fadeIn">

        {/* TOP SECTION */}
        <div className="relative h-40 bg-gradient-to-r from-cyan-500 to-blue-600">

          {/* Profile Image */}
          <div className="absolute -bottom-14 left-1/2 transform -translate-x-1/2">

            <img
              src={
                user.photo
                  ? `http://localhost:4000/${user.photo}`
                  : "https://via.placeholder.com/150"
              }
              alt="profile"
              className="w-28 h-28 rounded-full border-4 border-white object-cover shadow-lg"
            />

          </div>

        </div>

        {/* DETAILS */}
        <div className="pt-20 pb-8 px-6 text-center">

          {/* Name + Email */}
          <h2 className="text-2xl font-semibold">
            {user.name}
          </h2>

          <p className="text-white/70">{user.email}</p>

          <p className="text-xs text-white/50 mt-1">
            Joined: {new Date(user.createdAt).toLocaleDateString()}
          </p>

          {/* STATUS */}
          <div className="mt-3">
            <span className="px-3 py-1 text-xs bg-green-500/20 text-green-400 rounded-full">
              ● Active Account
            </span>
          </div>

          {/* INFO CARDS */}
          <div className="grid md:grid-cols-2 gap-5 mt-8 text-left">

            <div className="bg-white/10 p-4 rounded-xl">
              <p className="text-sm text-white/60">Phone</p>
              <p className="font-medium">
                {user.phone || <span className="text-white/40 italic">Not added</span>}
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-xl">
              <p className="text-sm text-white/60">Address</p>
              <p className="font-medium">
                {user.address || <span className="text-white/40 italic">Not added</span>}
              </p>
            </div>

          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col md:flex-row gap-4 mt-8">

            <Link
              to="/editprofile"
              className="flex-1 bg-cyan-500 hover:bg-cyan-600 py-2 rounded-lg text-center font-medium transition"
            >
              Edit Profile
            </Link>

            <Link
              to="/userhome"
              className="flex-1 border border-white/30 py-2 rounded-lg text-center hover:bg-white/10 transition"
            >
              Back to Dashboard
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default UserProfile;