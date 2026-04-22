import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Menu from "./Menu";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token") || "";

  useEffect(() => {
    fetchBookings();
  }, []);

  // FETCH BOOKINGS
  const fetchBookings = async () => {
    try {
      if (!token) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      const res = await axios.get("http://localhost:4000/booking/Vbooking", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setBookings(res.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch bookings");
      setLoading(false);
    }
  };

  // CANCEL BOOKING
  const cancelBooking = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/booking/cancel/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(`✅ ${res.data.message}\n💰 Refund: ₹${res.data.refundAmount}`);

      setBookings((prev) =>
        prev.map((b) =>
          b._id === id
            ? { ...b, status: "cancelled", refundAmount: res.data.refundAmount }
            : b
        )
      );
    } catch (err) {
      alert("❌ Failed to cancel booking");
      console.log(err);
    }
  };

  // COMPLETE CHARGING
  const completeCharging = async (id) => {
    try {
      await axios.put(
        `http://localhost:4000/booking/complete/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: "completed" } : b))
      );
    } catch (err) {
      alert("Failed to complete charging");
    }
  };

  // PAYMENT
  const handlePay = (id) => {
    navigate("/pay", { state: { bookingId: id } });
  };

  // STATUS BADGE STYLE
  const statusBadge = (status) => {
    const base = "px-3 py-1 text-xs font-semibold rounded-full";

    switch (status) {
      case "pending":
        return `${base} bg-yellow-100 text-yellow-700`;
      case "confirmed":
        return `${base} bg-green-100 text-green-700`;
      case "completed":
        return `${base} bg-blue-100 text-blue-700`;
      case "cancelled":
        return `${base} bg-red-100 text-red-700`;
      default:
        return `${base} bg-gray-100 text-gray-600`;
    }
  };

  // GET BOOKING STATUS
  const getBookingStatus = (booking) => booking.status;

  // LOADING
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600 text-lg">Loading bookings...</p>
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-red-500 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <>
      {/* MENU */}
      <Menu />

      {/* PAGE CONTENT */}
      <div className="min-h-screen bg-gray-50 p-8 pt-24">
        {/* pt-24 ensures content is below fixed header */}

        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">
            My Bookings
          </h2>

          {bookings.length === 0 ? (
            <p className="text-gray-500">No bookings available.</p>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {bookings.map((b) => {
                const displayStatus = getBookingStatus(b);

                return (
                  <div
                    key={b._id}
                    className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-medium text-gray-800">
                        {b.station?.name}
                      </h3>
                      <span className={statusBadge(displayStatus)}>
                        {displayStatus}
                      </span>
                    </div>

                    <div className="text-sm text-gray-600 space-y-1">
                      <p>
                        <strong>Location:</strong> {b.station?.location}
                      </p>
                      <p>
                        <strong>Date:</strong>{" "}
                        {new Date(b.date).toLocaleDateString("en-IN")}
                      </p>
                      <p>
                        <strong>Time:</strong> {b.timeSlot}
                      </p>
                      <p>
                        <strong>Vehicle:</strong> {b.vehicleNo}
                      </p>
                      <p>
                        <strong>Price:</strong> ₹{b.amount}
                      </p>
                    </div>

                    {(displayStatus === "pending" ||
                      displayStatus === "confirmed") && (
                      <div className="flex gap-3 mt-6">
                        {displayStatus === "pending" && (
                          <button
                            onClick={() => handlePay(b._id)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition"
                          >
                            Proceed to Pay
                          </button>
                        )}

                        <button
                          onClick={() => cancelBooking(b._id)}
                          className="flex-1 border border-red-500 text-red-500 hover:bg-red-50 py-2 rounded-lg text-sm font-medium transition"
                        >
                          Cancel
                        </button>
                      </div>
                    )}

                    {displayStatus === "confirmed" && (
                      <button
                        onClick={() => completeCharging(b._id)}
                        className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg text-sm font-medium transition"
                      >
                        Complete Charging
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MyBookings;