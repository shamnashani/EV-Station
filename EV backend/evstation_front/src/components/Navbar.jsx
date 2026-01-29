import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import '../App.css'

function Navbar() {
    const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) { 
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
    return (
        <nav className={`fixed w-full top-0 z-50 transition-all duration-500 
          ${scrolled ? "bg-[#02141C] shadow-lg" : "bg-transparent"}`}>
        <div className="flex items-center px-6 py-4">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold text-white">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M13 2L6 14h5l-1 8 7-12h-5l1-8z" stroke="#00E5FF" strokeWidth="2" fill="transparent" /> </svg>
    EV Booking
</Link>
            <div className="flex gap-6 text-sm text-white ml-auto ">
                <Link to="/stations">Stations</Link>
                <Link to="/bookings">Bookings</Link>
                <Link to="/complaints">Complaints</Link>
                <Link to="/login">Login</Link>
            </div>
            </div>
        </nav>
    )
}

export default Navbar