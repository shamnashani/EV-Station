import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("role"));

  const [menuOpen, setMenuOpen] = useState(false); 
  const nav = useNavigate();
  const location = useLocation();

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (location.pathname === "/") {
        setScrolled(window.scrollY > 500);
      } else {
        setScrolled(true);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  // READ TOKEN ON ROUTE CHANGE
  useEffect(() => {
    setRole(localStorage.getItem("role"));
  }, [location]);

  //  Logout
  const logout = () => {
    localStorage.clear();
    setRole(null);
    nav('/login', { replace: true });
  };

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-500 
      ${scrolled ? "bg-[#02141C] shadow-lg" : "bg-transparent"}`}>

      <div className="flex items-center px-4 md:px-6 py-4">

        <Link
          to={role === "admin" ? "/adminhome" : role === "user" ? "/userHome" : "/"}
          className="flex items-center gap-2 text-xl font-bold text-white"
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
            <path d="M13 2L6 14h5l-1 8 7-12h-5l1-8z"
              stroke="#00E5FF" strokeWidth="2" fill="transparent" />
          </svg>
          EV Booking
        </Link>

        <button
          className="md:hidden text-white ml-auto text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <div className={`
          absolute md:static top-full left-0 w-full md:w-auto
          bg-[#02141C] md:bg-transparent
          flex flex-col md:flex-row items-center
          gap-5 md:gap-7 text-sm font-medium text-gray-200
          transition-all duration-300
          ${menuOpen ? "block py-4" : "hidden md:flex"}
        `}>


          <Link
            to={role === "admin" ? "/adminhome" : role === "user" ? "/userHome" : "/"}
            className="hover:text-[#00E5FF]"
            onClick={() => setMenuOpen(false)} 
          >
            Home
          </Link>

          <Link
            to="/vStation"
            className="hover:text-[#00E5FF]"
            onClick={() => setMenuOpen(false)} 
          >
            Stations
          </Link>

          {!role ? (
            <Link
              to="/login"
              className="px-6 py-2 bg-[#00E5FF] text-[#02141c] rounded-full font-bold hover:bg-white"
              onClick={() => setMenuOpen(false)} 
            >
              Login
            </Link>
          ) : role === "admin" ? (
            <>
              <Link to="/addstation" className="hover:text-[#00E5FF]" onClick={() => setMenuOpen(false)}>Add Station</Link>
              <Link to="/admincomplaints" className="hover:text-[#00E5FF]" onClick={() => setMenuOpen(false)}>Complaints</Link>
              <Link to="/allusers" className="hover:text-[#00E5FF]" onClick={() => setMenuOpen(false)}>Users</Link>

              <button
                onClick={logout}
                className="px-6 py-2 bg-[#00E5FF] text-[#02141c] rounded-full font-bold hover:bg-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/booking" className="hover:text-[#00E5FF]" onClick={() => setMenuOpen(false)}>Bookings</Link>
              <Link to="/mycom" className="hover:text-[#00E5FF]" onClick={() => setMenuOpen(false)}>Complaints</Link>
              <Link to="/userprofile" className="hover:text-[#00E5FF]" onClick={() => setMenuOpen(false)}>Profile</Link>

              <button
                onClick={logout}
                className="px-6 py-2 bg-[#00E5FF] text-[#02141c] rounded-full font-bold hover:bg-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;