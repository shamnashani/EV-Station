import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* About */}
        <div>
          <h2 className="text-white text-2xl font-bold mb-3">⚡ EV Booking</h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            Book EV charging slots instantly, find nearby stations, and enjoy 
            smooth, secure payments with round-the-clock charging access.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:text-white">Home</Link></li>
            <li><Link to="/stations" className="hover:text-white">Stations</Link></li>
            <li><Link to="/bookings" className="hover:text-white">Bookings</Link></li>
            <li><Link to="/complaints" className="hover:text-white">Complaints</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link className="hover:text-white">Help Center</Link></li>
            <li><Link className="hover:text-white">FAQs</Link></li>
            <li><Link className="hover:text-white">Safety Guidelines</Link></li>
            <li><Link className="hover:text-white">Report an Issue</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-white font-semibold text-lg mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>📍 EV Street, Calicut, Kerala</li>
            <li>📞 +91 98765 43210</li>
            <li>📧 support@evbooking.com</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="text-center text-gray-400 text-sm border-t border-gray-700 mt-10 pt-5">
        © {new Date().getFullYear()} EV Booking. All Rights Reserved.
      </div>
    </footer>
  );
}

export default Footer;
