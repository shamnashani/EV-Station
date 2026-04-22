import { useEffect, useState } from "react"
import api from './Api'


function ManageUsers() {

  const [users, setUsers] = useState([])

  const getUsers = async () => {

    try {

      const token = localStorage.getItem("token")

      const res = await api.get(
        "/admin/allUser",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setUsers(res.data)

    } catch (err) {
      console.log(err)
    }

  }

  useEffect(() => {
    getUsers()
  }, [])

  const activateUser = async (id) => {

    const token = localStorage.getItem("token")

    try {

      await api.put(
        `/admin/active/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      getUsers()

    } catch (err) {
      console.log(err)
    }

  }

  const deactivateUser = async (id) => {

    const token = localStorage.getItem("token")

    try {

      await api.put(
        `/admin/inactive/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      getUsers()

    } catch (err) {
      console.log(err)
    }

  }

  return (

    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-6">
        Manage Users
      </h1>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Phone</th>
              <th className="p-4">Status</th>
              <th className="p-4">Online</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>

            {users.map((u) => (

              <tr key={u._id} className="border-t">

                <td className="p-4">{u.name}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4">{u.phone}</td>

                <td className="p-4">
                  {u.status === "active" ? (
                    <span className="text-green-600 font-semibold">
                      Active
                    </span>
                  ) : (
                    <span className="text-red-600 font-semibold">
                      Inactive
                    </span>
                  )}
                </td>

                <td className="p-4">
                  {u.online ? (
                    <span className="text-green-500 font-semibold">
                      🟢 Online
                    </span>
                  ) : (
                    <span className="text-gray-500">
                      🔴 Offline
                    </span>
                  )}
                </td>

                <td className="p-4 flex gap-3">

                  {u.status === "active" ? (

                    <button
                      onClick={() => deactivateUser(u._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Deactivate
                    </button>

                  ) : (

                    <button
                      onClick={() => activateUser(u._id)}
                      className="bg-green-500 text-white px-3 py-1 rounded"
                    >
                      Activate
                    </button>

                  )}

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )
}

export default ManageUsers