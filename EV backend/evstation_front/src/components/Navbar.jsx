import React, { useEffect, useState } from 'react';
import { Link, useNavigate,useLocation } from 'react-router-dom';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("role"))
  const nav = useNavigate();
  const location=useLocation()

  // ✅ Detect scroll
useEffect(() => {
  const handleScroll = () => {
    if (location.pathname === "/") {
      setScrolled(window.scrollY > 500); 
    } else {
      setScrolled(true); // always solid for other pages
    }
  };

  handleScroll()

  window.addEventListener("scroll", handleScroll);
  return () => window.removeEventListener("scroll", handleScroll);
}, [location.pathname]);

  // ✅ READ TOKEN ON FIRST LOAD
  useEffect(() => {
     setRole(localStorage.getItem("role"))
  }, [location]);

  // ✅ Logout
  const logout = () => {
    localStorage.clear()
    setRole(null);
    nav('/login', { replace: true })
  }
  

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-500 
      ${scrolled ? "bg-[#02141C] shadow-lg" : "bg-transparent"}`}>
      
      <div className="flex items-center px-6 py-4">
        <Link to={role === "admin" ? "/adminhome" : role === "user" ? "/userHome" : "/"} className="flex items-center gap-2 text-xl font-bold text-white">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M13 2L6 14h5l-1 8 7-12h-5l1-8z"
              stroke="#00E5FF" strokeWidth="2" fill="transparent" />
          </svg>
          EV Booking
        </Link>

        <div className="flex items-center gap-7 text-sm font-medium text-gray-200 ml-auto">
          <Link to={role === "admin" ? "/adminhome" : role === "user" ? "/userHome" : "/"} className="hover:text-[#00E5FF]">Home</Link>
          <Link to="/vStation" className="hover:text-[#00E5FF]">
            Stations
          </Link>

          {!role ? (
            // NOT LOGGED IN
            <Link
              to="/login"
              className="px-6 py-2 bg-[#00E5FF] text-[#02141c] rounded-full font-bold hover:bg-white">
              Login
            </Link>
          )  : role === "admin" ? (
            // ✅ LOGGED IN
            <>
           <Link to="/addstation" className="hover:text-[#00E5FF]">Add Station</Link>
              <Link to="/admincomplaints" className="hover:text-[#00E5FF]">Complaints</Link>
              <Link to="/allusers" className="hover:text-[#00E5FF]">Users</Link>

              <button
                onClick={logout}
                className="px-6 py-2 bg-[#00E5FF] text-[#02141c] rounded-full font-bold hover:bg-white"
              >
                Logout
              </button>
            </>
          ) : (
             <>
              <Link to="/booking" className="hover:text-[#00E5FF]">Bookings</Link>
              <Link to="/mycom" className="hover:text-[#00E5FF]">Complaints</Link>
              <Link to="/userprofile" className="hover:text-[#00E5FF]">Profile</Link>

              <button
                onClick={logout}
                className="px-6 py-2 bg-[#00E5FF] text-[#02141c] rounded-full font-bold hover:bg-white"
              >
                Logout
              </button>
            </>          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
