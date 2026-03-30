import React from "react";

function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-white py-20">

      <div className="max-w-5xl mx-auto px-6">

{/* Title Section */}
<div className="text-center mb-20 max-w-3xl mx-auto px-4">

  <h1 className="text-4xl font-bold text-gray-800 mb-5">
    About EV Booking
  </h1>

  <p className="text-gray-600 leading-relaxed mb-6">
    EV Booking is a smart web application developed to simplify the process of 
    finding and booking electric vehicle charging stations. It helps users 
    locate nearby stations, check availability, and reserve slots easily.
  </p>

  <div className="w-16 h-1 bg-blue-500 mx-auto my-6 rounded-full"></div>

  <p className="text-gray-600 leading-relaxed">
    This system reduces waiting time at charging stations and provides a smooth 
    and efficient booking experience for EV users.
  </p>

</div>
        <div className="text-center mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            What are Electric Vehicles?
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Electric Vehicles (EVs) run on electricity instead of fuel, reducing pollution 
            and supporting a cleaner environment.
          </p>
        </div>


        <div className="mb-16">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-10">
            Key Features
          </h2>

          <div className="space-y-6 max-w-3xl mx-auto">
            
            <div className="border-l-4 border-blue-500 pl-4">
              <h3 className="font-semibold text-lg">Fast Booking</h3>
              <p className="text-gray-600">
                Book charging slots instantly without waiting.
              </p>
            </div>

            <div className="border-l-4 border-green-500 pl-4">
              <h3 className="font-semibold text-lg">Nearby Stations</h3>
              <p className="text-gray-600">
                Easily locate stations near your location.
              </p>
            </div>

            <div className="border-l-4 border-yellow-500 pl-4">
              <h3 className="font-semibold text-lg">Secure Payments</h3>
              <p className="text-gray-600">
                Safe and reliable payment experience.
              </p>
            </div>

          </div>
        </div>


        <div className="grid md:grid-cols-2 gap-8 mb-16">

          <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Our Mission
            </h2>
            <p className="text-gray-600">
              To simplify EV charging by offering a seamless and user-friendly booking experience.
            </p>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-2xl shadow-sm">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Our Vision
            </h2>
            <p className="text-gray-600">
              To support sustainable transportation by enabling efficient EV charging solutions.
            </p>
          </div>

        </div>


        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-2 gap-4 text-gray-600 max-w-3xl mx-auto">
            <p>✔ Saves time with quick booking</p>
            <p>✔ Easy and user-friendly interface</p>
            <p>✔ Real-time availability</p>
            <p>✔ Secure and reliable system</p>
          </div>
        </div>

      </div>
    </div>
  );
}

export default About;