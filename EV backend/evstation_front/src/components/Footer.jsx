import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-3">⚡ EVCharge</h2>
          <p className="text-gray-400">
            Fast, reliable, and convenient electric vehicle charging stations near you.
          </p>
          <div className="flex gap-3 mt-4">
            <a href="#" className="hover:text-white transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-white transition"><FaTwitter /></a>
            <a href="#" className="hover:text-white transition"><FaInstagram /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
          <li><a href="/" className="hover:text-white transition">Home</a></li>
          <li><a href="/vStation" className="hover:text-white transition">Stations</a></li>
          <li><a href="/about" className="hover:text-white transition">About Us</a></li>
          </ul>
        </div>

        {/* Support */}
<div>
  <h3 className="font-semibold text-white mb-3">Support & Help</h3>
  <ul className="space-y-2">
    <li><a href="/help" className="hover:text-white transition">Help Center</a></li>
    <li><a href="/faq" className="hover:text-white transition">FAQs</a></li>
    <li><a href="/com" className="hover:text-white transition">Report an Issue</a></li>
  </ul>
</div>

        {/* Contact */}
    <div>
          <h3 className="text-white font-semibold text-lg mb-3">Contact Us</h3>
          <ul className="space-y-2 text-sm">
            <li>📍Calicut, Kerala</li>
            <li>📞 +91 98765 43210</li>
            <li>📧 supportevbooking@gmail.com</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} EVCharge. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;