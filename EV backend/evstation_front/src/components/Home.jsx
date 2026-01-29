import React, { useEffect } from 'react'
import '../App.css'
import Navbar from './Navbar'
import Footer from './Footer'
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from 'react-router-dom';

function Home() {

    useEffect(() => {
        AOS.init({ duration: 800, offset: 120 });
    }, []);

    return (
        <>

            {/* Navbar */}
            <Navbar></Navbar>

            {/* Hero Section */}
            <div className='wrapper'>
            <div className="pt-24  text-center  bg-transparent relative z-10">
                <h1 className="text-5xl font-bold mb-4 text-white" data-aos="fade-down">
                    Book Your EV Charging Slot Easily </h1>
                <p className="text-gray-300 max-w-xl mx-auto" data-aos="fade-up">
                    Find your nearest EV charging station, check slot availability, and book instantly.
                </p>
            </div>
             </div>

            {/* Section  */}
            <section className="w-full py-20 bg-white">
                <h2 className="text-3xl font-bold text-center mb-10 text-gray-800" data-aos="fade-up">
                    Why Choose Our EV Booking System?
                </h2>

              <div className="max-w-8xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-9 px-8">

    <div className="p-6 shadow rounded-lg bg-gray-100 text-center card" data-aos="fade-up">
        <h3 className="font-semibold text-lg mb-2">⚡ Fast Booking</h3>
        <p className="text-gray-600">
            Experience instant real-time slot booking with a smooth and hassle-free process.
        </p>
    </div>

    <div className="p-6 shadow rounded-lg bg-gray-100 text-center card" data-aos="fade-up" data-aos-delay="200">
        <h3 className="font-semibold text-lg mb-2">📍 Nearby Stations</h3>
        <p className="text-gray-600">
            Easily find nearby stations with real-time availability and accurate distance tracking.
        </p>
    </div>

    <div className="p-6 shadow rounded-lg bg-gray-100 text-center card" data-aos="fade-up" data-aos-delay="400">
        <h3 className="font-semibold text-lg mb-2">💳 Easy Payments</h3>
        <p className="text-gray-600">
            Enjoy secure, simple, and transparent payments with fast checkout.
        </p>
    </div>

    <div className="p-6 shadow rounded-lg bg-gray-100 text-center card" data-aos="fade-up" data-aos-delay="600">
        <h3 className="font-semibold text-lg mb-2">🔌 24/7 Charging Access</h3>
        <p className="text-gray-600">
            Access charging stations anytime with reliable round-the-clock availability for all journeys.
        </p>
    </div>

</div>

            </section>
            {/* Login Section */}
    <section className="w-full py-20 bg-white-50">
     <div className="max-w-3xl mx-auto text-center px-6 p-6 shadow rounded-lg bg-gray-100 text-center card" data-aos="fade-up" data-aos-delay="600">

      <h2 className="text-3xl font-bold mb-4 text-gray-800">Get Started With Us</h2>
      <p className="text-gray-600 mb-8">
      Create an account to book your charging slots, manage payments, and view your booking history easily.
    </p>

    <div className="flex flex-col md:flex-row justify-center gap-6">

      <Link to="/login" className="px-8 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition">
        Login
      </Link>

      <Link to="/signup" className="px-8 py-3 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition">
        Create Account
      </Link>

    </div>

  </div>
</section>


            {/* Footer */}
            <Footer></Footer>
            </>

       
    )
}

export default Home;
