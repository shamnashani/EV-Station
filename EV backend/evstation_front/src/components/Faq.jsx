import React from "react";
import { FaQuestion } from "react-icons/fa"
import Menu from "./Menu";

function Faqs() {
  <Menu></Menu>
  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center gap-2">
        Frequently Asked Questions <FaQuestion  className="text-red-700" />

      </h1>

      <div className="max-w-3xl mx-auto space-y-8">

        {/* Booking */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Booking a charging slot
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Go to the "Stations" page.</li>
            <li>Select a charging station.</li>
            <li>Choose date and time slot.</li>
            <li>Click "Book" to create your booking.</li>
            <li className="italic text-gray-400">
              Note: Booking will be in pending state until payment is completed.
            </li>
          </ul>
        </section>

        {/* Payment */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Payments
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Payments are done using Razorpay.</li>
            <li>Supported: UPI, Cards, Net Banking.</li>
            <li>After successful payment, booking becomes confirmed.</li>
            <li className="italic text-gray-400">
              Note: Slot is reserved only after payment confirmation.
            </li>
          </ul>
        </section>

        {/* Booking Status */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Booking Status
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li><b>Pending:</b> Booking created but payment not done.</li>
            <li><b>Confirmed:</b> Payment successful and slot reserved.</li>
            <li><b>Completed:</b> Charging finished.</li>
            <li><b>Cancelled:</b> Booking cancelled or expired.</li>
          </ul>
        </section>

        {/* Cancellation */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Canceling a booking
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Go to "My Bookings".</li>
            <li>Select your booking.</li>
            <li>Click "Cancel".</li>
            <li className="italic text-gray-400">
              Note: Slot will be released back after cancellation.
            </li>
          </ul>
        </section>

        {/* Notifications */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Notifications
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Notifications are shown inside the app.</li>
            <li>You can view them in the Notifications page.</li>
            <li>Red badge appears when there are new updates.</li>
            <li>
              Notifications include booking status updates like confirmed,
              cancelled, or completed.
            </li>
          </ul>
        </section>

        {/* Profile */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Profile Updates
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Go to Profile page.</li>
            <li>Edit your name, phone, or address.</li>
          </ul>
        </section>

        {/* Support */}
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Support
          </h2>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Use the "Support" page to raise complaints.</li>
            <li>You can track your complaints in "My Complaints".</li>
          </ul>
        </section>

      </div>
    </div>
  );
}

export default Faqs;