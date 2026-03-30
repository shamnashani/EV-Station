import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaBolt, FaWallet, FaUser, FaTimesCircle, FaBell, FaLifeRing } from "react-icons/fa";

const Help = () => {
  const [open, setOpen] = useState(null);

  const faqs = [
    {
      id: "booking",
      icon: <FaBolt className="text-yellow-500" />,
      title: "Booking a Charging Station",
      content: (
        <>
          <p>1. Browse the stations page to see available charging hubs near your location.</p>
          <p>2. Select a station, check the availability calendar, and choose a date & time slot.</p>
          <p>3. Confirm your booking and check the summary before proceeding to payment.</p>
          <p>4. You will receive a booking confirmation via email and app notification.</p>
          <p className="mt-2 text-gray-500 text-sm italic">Tip: Book early for peak-hour slots to avoid delays.</p>
        </>
      )
    },
    {
      id: "payment",
      icon: <FaWallet className="text-green-500" />,
      title: "Making Payments",
      content: (
        <>
          <p>1. After confirming your booking, proceed to the payment page.</p>
          <p>2. Select your preferred payment method: Razorpay, UPI, or other supported wallets.</p>
          <p>3. Complete the payment securely by following the on-screen instructions.</p>
          <p>4. Once payment is successful, you will get a receipt in your email and app.</p>
          <p className="mt-2 text-gray-500 text-sm italic">Tip: Ensure your payment method has sufficient balance before starting.</p>
        </>
      )
    },
    {
      id: "cancel",
      icon: <FaTimesCircle className="text-red-500" />,
      title: "Canceling Bookings",
      content: (
        <>
          <p>1. Navigate to 'My Bookings' in your profile.</p>
          <p>2. Select the booking you want to cancel and click 'Cancel'.</p>
          <p>3. Read the cancellation policy for refund eligibility.</p>
          <p>4. Confirm the cancellation. Refund will be processed according to policy.</p>
          <p className="mt-2 text-gray-500 text-sm italic">Note: Some promotions or peak-hour bookings may have no refunds.</p>
        </>
      )
    },
    {
      id: "profile",
      icon: <FaUser className="text-blue-500" />,
      title: "Updating Profile",
      content: (
        <>
          <p>1. Go to your 'Profile' page.</p>
          <p>2. Click 'Edit Profile' to update your name, email, phone number, address, or profile picture.</p>
          <p>3. Save changes to update your information in our system.</p>
          <p className="mt-2 text-gray-500 text-sm italic">Tip: Keeping your profile up-to-date ensures you get important notifications.</p>
        </>
      )
    },
    
    {
      id: "notifications",
      icon: <FaBell className="text-orange-500" />,
      title: "Booking & Payment Notifications",
      content: (
        <>
          <p>1. You will receive notifications for booking confirmations, payment receipts, and reminders before your slot.</p>
          <p>2. Enable push notifications in the app to get real-time alerts.</p>
          <p>3. Email notifications are sent for every booking and transaction.</p>
          <p className="mt-2 text-gray-500 text-sm italic">Tip: Check your notification settings to avoid missing any updates.</p>
        </>
      )
    },
    {
      id: "support",
      icon: <FaLifeRing className="text-teal-500" />,
      title: "Need Help / Support",
      content: (
        <>
          <p>1. Visit 'Help & Support' in the app or website.</p>
          <p>2. You can chat with support or submit a ticket with your booking ID and issue details.</p>
          <p>3. Our support team responds 24/7 for registered users.</p>
          <p className="mt-2 text-gray-500 text-sm italic">Tip: Provide as much detail as possible to get faster resolution.</p>
        </>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-12 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
        ⚡ Help Center
      </h1>

      <div className="w-full max-w-md space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="bg-white rounded-xl shadow-md overflow-hidden border transition-all hover:shadow-lg">
            <button
              className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-gray-100 focus:outline-none"
              onClick={() => setOpen(open === faq.id ? null : faq.id)}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{faq.icon}</span>
                <span className="font-medium text-gray-800">{faq.title}</span>
              </div>
              {open === faq.id ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
            </button>
            <div
              className={`px-6 pb-4 text-gray-600 transition-all duration-300 ${
                open === faq.id ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0"
              } overflow-hidden`}
            >
              {faq.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Help;