import React, { useState, useEffect } from "react";
import {
  FaBars,
  FaClipboardList,
  FaUser,
  FaCommentDots,
  FaSignOutAlt,
  FaBell,
  FaInfoCircle,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import api from "./Api";

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [unread, setUnread] = useState(0);
  const role = localStorage.getItem("role") || "";

  const navigate = useNavigate();

  useEffect(() => {
    fetchUnread();
    const interval = setInterval(fetchUnread, 5000);
    return () => clearInterval(interval);
  }, []);

  const fetchUnread = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const res = await api.get("/booking/Vbooking", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const bookings = res.data;
      const seenCount = Number(localStorage.getItem("seenCount")) || 0;
      const currentCount = bookings.length;
      const unreadCount = currentCount - seenCount;

      setUnread(unreadCount > 0 ? unreadCount : 0);
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      {/* TOP BAR */}
      <div className="flex justify-between items-center p-4 bg-[#02141C] text-white fixed w-full top-0 z-40">
        <button onClick={() => setOpen(true)} className="text-2xl">
          <FaBars />
        </button>

        <h1 className="font-bold text-lg">EV Charging</h1>

       
        <div className="flex items-center gap-6">
          <Link
            to={role === "admin" ? "/adminhome" : role === "user" ? "/userHome" : "/"}
            className="hover:text-[#00E5FF] font-medium"
          >
            Home
          </Link>

          <div
            className="relative cursor-pointer"
            onClick={() => navigate("/notification")}
          >
            <FaBell size={20} />
            {unread > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-[1px] rounded-full">
                {unread}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-[#02141C] text-white transform transition-transform duration-300 z-50 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setOpen(false)}>✕</button>
        </div>

        <ul className="flex flex-col gap-6 p-6 text-lg">
          <Link to="/about" className="flex items-center gap-3">
            <FaInfoCircle /> About
          </Link>

          <Link to="/vbooking" className="flex items-center gap-3">
            <FaClipboardList /> My Bookings
          </Link>

          <Link to="/userprofile" className="flex items-center gap-3">
            <FaUser /> Profile
          </Link>

          <Link to="/com" className="flex items-center gap-3">
            <FaCommentDots /> Support
          </Link>

          <button
            onClick={logout}
            className="flex items-center gap-3 text-red-400 mt-4"
          >
            <FaSignOutAlt /> Logout
          </button>
        </ul>
      </div>
    </>
  );
};

export default Menu;