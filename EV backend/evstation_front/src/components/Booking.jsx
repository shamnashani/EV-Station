import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Menu from "./Menu";

const BookingPage = () => {

  const { state } = useLocation();
  const navigate = useNavigate();
  const station = state?.station;

  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [vehicleNo, setVehicleNo] = useState("");
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLogin(!!token);
  }, []);

  // ✅ format time (24 → AM/PM)
  const formatTime = (hour) => {
    const period = hour >= 12 ? "PM" : "AM";
    const formatted = hour % 12 || 12;
    return `${formatted}:00 ${period}`;
  };

  // ✅ generate slots
  const generateSlots = () => {
    let slots = [];

    for (let i = 0; i < 24; i++) {
      const start = formatTime(i);
      const end = formatTime((i + 1) % 24);
      slots.push(`${start} - ${end}`);
    }

    return slots;
  };

  const slots = generateSlots();

  // ✅ check if slot is expired (for today)
  const isSlotExpired = (slot) => {

    if (!date) return false;

    const today = new Date().toISOString().split("T")[0];

    if (date !== today) return false;

    const now = new Date();

    const startTime = slot.split("-")[0].trim();

    let [time, period] = startTime.split(" ");
    let [hour, minute] = time.split(":");

    hour = parseInt(hour);
    minute = parseInt(minute);

    if (period === "PM" && hour !== 12) hour += 12;
    if (period === "AM" && hour === 12) hour = 0;

    const slotTime = new Date();
    slotTime.setHours(hour);
    slotTime.setMinutes(minute);
    slotTime.setSeconds(0);

    return slotTime <= now;
  };

  // ✅ BOOKING FUNCTION
  const Booking = async (e) => {

    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      alert("❌ Please login first to book a slot!");
      navigate("/login");
      return;
    }

    if (!date || !timeSlot || !vehicleNo) {
      alert("❌ Please fill all fields");
      return;
    }

    const bookingData = {
      stationId: station._id,
      date,
      timeSlot,
      vehicleNo,
    };

    try {

      const res = await axios.post(
        "https://ev-station-1-tbha.onrender.com/booking/booking",
        bookingData,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("✅ Booking Successful!");
      navigate("/pay", { state: { bookingId: res.data._id } });

    } catch (err) {

      if (err.response) {
        alert(`❌ ${err.response.data.message}`);
      } else {
        alert("❌ Booking failed. Try again.");
      }

      console.log(err);
    }
  };

  return (
    <>
    <Menu></Menu>

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f2027] to-[#2c5364] text-white">

      <form
        onSubmit={Booking}
        className="bg-white/10 p-8 rounded-2xl w-[400px] space-y-4"
      >

        <h2 className="text-xl font-bold text-center">
          🔌 Book Charging Slot
        </h2>

        <p className="text-sm text-center text-white/70">
          {station?.name} - {station?.location}
        </p>

        {/* ✅ DATE WITH LIMIT */}
        <input
          type="date"
          required
          min={new Date().toISOString().split("T")[0]}
          max={
            new Date(new Date().setDate(new Date().getDate() + 30))
              .toISOString()
              .split("T")[0]
          }
          onChange={(e) => {
            setDate(e.target.value);
            setTimeSlot(""); // reset slot when date changes
          }}
          className="w-full p-2 rounded bg-white text-black"
        />

        {/* ✅ SLOT SELECTION */}
        <div>
          <p className="mb-2 text-sm">Select Time Slot</p>

          <div className="grid grid-cols-2 gap-2 max-h-[150px] overflow-y-auto">

            {slots.map((slot, index) => {

              const expired = isSlotExpired(slot);

              return (
                <button
                  type="button"
                  key={index}
                  disabled={expired}
                  onClick={() => setTimeSlot(slot)}
                  className={`p-2 rounded text-sm
                    ${expired ? "bg-gray-400 cursor-not-allowed" :
                      timeSlot === slot ? "bg-green-600 text-white" :
                        "bg-white text-black"}
                  `}
                >
                  {slot}
                </button>
              );
            })}

          </div>
        </div>

        {/* VEHICLE */}
        <input
          type="text"
          placeholder="Vehicle Number"
          required
          onChange={(e) => setVehicleNo(e.target.value)}
          className="w-full p-2 rounded bg-white text-black"
        />

        {/* BUTTON */}
        <button
          type="submit"
          className="w-full py-2 bg-green-600 hover:bg-green-700 rounded font-semibold"
        >
          Confirm Booking
        </button>

        {!login && (
          <p className="text-red-400 text-center mt-2">
            Please login first to book a slot.
          </p>
        )}

      </form>

    </div>
    </>
  );
};

export default BookingPage;