import { useEffect, useState } from "react"
import api from './Api'
function Allbookings() {

    const [bookings, setBookings] = useState([])

    const getBookings = async () => {

        try {

            const token = localStorage.getItem("token")

            const res = await api.get(
                "/admin/allBookings",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setBookings(res.data)

        } catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        getBookings()
    }, [])

    return (

        <div className="min-h-screen bg-gray-100 p-10">

            <h1 className="text-3xl font-bold mb-6">
                All Bookings
            </h1>

            <div className="bg-white shadow-lg rounded-xl overflow-hidden">

                <table className="w-full text-left">

                    <thead className="bg-gray-200">

                        <tr>
                            <th className="p-4">User</th>
                            <th className="p-4">Station</th>
                            <th className="p-4">Location</th>
                            <th className="p-4">Vehicle</th>
                            <th className="p-4">Date</th>
                            <th className="p-4">Slot</th>
                            <th className="p-4">Amount</th>
                            <th className="p-4">Status</th>
                        </tr>

                    </thead>

                    <tbody>

                        {bookings.map((b) => (

                            <tr key={b._id} className="border-t">

                                <td className="p-4">{b.user?.name}</td>

                                <td className="p-4">{b.station?.name}</td>

                                <td className="p-4">{b.station?.location}</td>

                                <td className="p-4">{b.vehicleNo}</td>

                                <td className="p-4">{b.date}</td>

                                <td className="p-4">{b.timeSlot}</td>

                                <td className="p-4">₹{b.amount}</td>

                                <td className="p-4">

                                    {b.status === "pending" && <span className="text-yellow-500">Pending</span>}
                                    {b.status === "confirmed" && <span className="text-blue-500">Confirmed</span>}
                                    {b.status === "completed" && <span className="text-green-500">Completed</span>}
                                    {b.status === "cancelled" && <span className="text-red-500">Cancelled</span>}

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

        </div>

    )

}

export default Allbookings