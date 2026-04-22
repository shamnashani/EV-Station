import React, { useEffect, useState } from "react"
import Menu from "./Menu"
import api from './Api'
function Allpayments() {

  const [payments, setPayments] = useState([])

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const token = localStorage.getItem("token")

        const res = await api.get(
          "/admin/allpayments",
          {
            headers: { Authorization: `Bearer ${token}` }
          }
        )

        setPayments(res.data)

      } catch (err) {
        console.log(err)
      }
    }

    fetchPayments()
  }, [])

  return (
    <>
      <Menu />

      <div className="min-h-screen bg-gray-100 pt-28 px-6">

        <h1 className="text-2xl font-bold mb-6">
          All Payments 💳
        </h1>

        <div className="bg-white rounded-xl shadow p-4 overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b">
                <th className="p-3">User</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>

            <tbody>

              {payments.length > 0 ? (
                payments.map((p) => (
                  <tr key={p._id} className="border-b">

                    <td className="p-3">
                      {p.user?.name || "User"}
                    </td>

                    <td className="p-3">
                      ₹{p.amount}
                    </td>

                    <td className="p-3">
                        {p.status}
                     
                    </td>

                    <td className="p-3">
                      {new Date(p.createdAt).toLocaleDateString()}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center p-4">
                    No payments found
                  </td>
                </tr>
              )}

            </tbody>

          </table>

        </div>

      </div>
    </>
  )
}

export default Allpayments