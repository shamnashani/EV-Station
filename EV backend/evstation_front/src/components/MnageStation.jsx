import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ManageStation() {

  // state to store stations from database
  const [stations, setStations] = useState([]);

  const nav = useNavigate();

  // ==============================
  // FETCH ALL STATIONS
  // ==============================
  const getStations = async () => {
    try {

      const token = localStorage.getItem("token")

      const res = await axios.get(
        "https://ev-station-1-tbha.onrender.com/admin/allStation",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      console.log(res.data)
      setStations(res.data.Station)

    } catch (err) {

      console.log(err)
      alert("Unauthorized access")

    }

  }


  // load stations when page loads
  useEffect(() => {
    getStations();
  }, []);

  // ==============================
  // DELETE STATION
  // ==============================
  const deleteStation = async (id) => {

    if (!window.confirm("Delete this station?")) return;
    const token=localStorage.getItem("token")

    try {

      await axios.delete(`https://ev-station-1-tbha.onrender.com/admin/dlt/${id}`,
        {headers:{
          Authorization:`Bearer ${token}`
        }}

      );

      alert("Station deleted");

      // reload stations
      getStations();

    } catch (err) {
      console.log(err);
    }
  };

  // ==============================
  // EDIT STATION
  // ==============================
  const editStation = (id) => {

    // navigate to edit page
    nav(`/editStation/${id}`);

  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">

      <h1 className="text-3xl font-bold mb-6">
        Manage Stations
      </h1>

      <div className="bg-white shadow-lg rounded-xl overflow-hidden">

        <table className="w-full text-left">

          <thead className="bg-gray-200">
            <tr>
              <th className="p-4">Station Name</th>
              <th className="p-4">Location</th>
              <th className="p-4">Chargers</th>
              <th className="p-4">Price</th>
              <th className="p-4">Description</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>

            {stations.map((station) => (
              <tr key={station._id} className="border-t">

                <td className="p-4">{station.name}</td>
                <td className="p-4">{station.location}</td>
                <td className="p-4">{station.chargerTypes.join(", ")}</td>
                <td className="p-4">₹{station.priceperHour}</td>
                <td className="p-4">{station.description}</td>

                <td className="p-4 flex gap-3">

                  {/* EDIT BUTTON */}
                  <button
                    onClick={() => editStation(station._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                  {/* DELETE BUTTON */}
                  <button
                    onClick={() => deleteStation(station._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ManageStation;