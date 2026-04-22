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
          "https://ev-station-1-tbha.onrender.com/user/userprofile",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        );
        console.log(res.data)
        

        setUser(res.data);

      } catch (error) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    };

    fetchProfile();
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p>Loading profile...</p>
      </div>
    );
  }
  console.log("PHOTO:", user.photo);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">

      <div className="bg-white shadow-md rounded-xl w-full max-w-md p-6">

        {/* Profile Image */}
        <div className="flex justify-center">
          <img
            src={
              user.photo
                ? `http://localhost:4000/media/${user.photo}`
                : "https://via.placeholder.com/120"
            }
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-cyan-500"
          />
        </div>

        {/* Name */}
        <h2 className="text-center text-xl font-semibold mt-4 text-gray-800">
          {user.name}
        </h2>

        <p className="text-center text-gray-500">
          {user.email}
        </p>

        {/* Details */}
        <div className="mt-6 space-y-4">

          <div>
            <p className="text-sm text-gray-500">Phone</p>
            <p className="font-medium text-gray-800">
              {user.phone || "Not added"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Address</p>
            <p className="font-medium text-gray-800">
              {user.address || "Not added"}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Joined</p>
            <p className="font-medium text-gray-800">
              {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>

        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-3">

          <Link
            to="/editprofile"
            className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-white py-2 rounded text-center font-medium"
          >
            Edit
          </Link>

          <Link
            to="/userhome"
            className="flex-1 border border-gray-300 py-2 rounded text-center hover:bg-gray-100"
          >
            Back
          </Link>

        </div>

      </div>

    </div>
  );
};

export default UserProfile;