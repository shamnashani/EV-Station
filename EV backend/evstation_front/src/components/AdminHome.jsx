
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Menu from "./Menu";
import Footer from "./Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { FaPlus } from "react-icons/fa"

const AdminHome = () => {

  // get admin name from localStorage
  const adminName = localStorage.getItem("name") || "Admin";

  const [user,setuser]=useState([])
  const [pay,setpay]=useState([])
  const [station,setstation]=useState([])
  const [book,setbook]=useState([])

  useEffect(() => {
    // start animation library
    AOS.init({  duration: 800, offset: 120 });
  

  const admin=async()=>{
     try {

        // get token from localStorage
      const token = localStorage.getItem("token");
    const res=await axios.get('https://ev-station-1-tbha.onrender.com/admin/getAll',
      {
        headers:{
          Authorization:`Bearer ${token}`
        }
      }
      
    ) 
    console.log(res.data);
    
    setuser(res.data.users.length)
    setpay(res.data.payments.length)
    setbook(res.data.bookings.length)
    setstation(res.data.stations.length)
  }catch(err)
  { console.log ("error",err)}

  }
  admin()
  }, []);

  

  return (
    <>
      {/* top menu */}
      <Menu />

      <div className="min-h-screen bg-gray-100 pt-28 px-6">

        <div className="max-w-7xl mx-auto">

          {/* ================= WELCOME ================= */}
          <div className="mb-8">

            {/* admin greeting */}
            <h1 className="text-3xl font-bold">
              Admin Dashboard 👨‍💻
            </h1>

            <p className="text-gray-600 mt-1">
              Welcome back, {adminName}
            </p>

          </div>


          {/* ================= STATISTICS ================= */}
          {/* small cards showing system summary */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

            {/* total users */}
            <div className="bg-white p-5 rounded-xl shadow">
              <p className="text-gray-500">Users</p>
              <h2 className="text-2xl font-bold">{user}</h2>
            </div>

            {/* total stations */}
            <div className="bg-white p-5 rounded-xl shadow">
              <p className="text-gray-500">Stations</p>
              <h2 className="text-2xl font-bold">{station}</h2>
            </div>

            {/* total bookings */}
            <div className="bg-white p-5 rounded-xl shadow">
              <p className="text-gray-500">Bookings</p>
              <h2 className="text-2xl font-bold">{book}</h2>
            </div>

            {/* total payments */}
            <div className="bg-white p-5 rounded-xl shadow">
              <p className="text-gray-500">Payments</p>
              <h2 className="text-2xl font-bold">{pay}</h2>
            </div>

          </div>


          {/* ================= MANAGEMENT ACTIONS ================= */}
<h2 className="text-xl font-semibold mb-4 text-black dark:text-black">
  Management
</h2>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10">

  {[
    {
      title: "Add Station",
      icon: "➕",
      color: "from-blue-500 to-blue-700",
      link: "/addstation"
    },
    {
      title: "Manage Stations",
      icon: "⚙️",
      color: "from-purple-500 to-purple-700",
      link: "/manageStation"
    },
    {
      title: "Complaints",
      icon: "📝",
      color: "from-red-500 to-red-700",
      link: "/admin/com"
    },
    {
      title: "Users",
      icon: "👥",
      color: "from-green-500 to-green-700",
      link: "/admin/alluser"
    },
    {
      title: "Bookings",
      icon: "📄",
      color: "from-yellow-400 to-yellow-600",
      link: "/admin/allbookings"
    },
    {
      title: "Payments",
      icon: "💳",
      color: "from-indigo-500 to-indigo-700",
      link: "/admin/payments"
    }].map((item, i) => (

    <Link
      key={i}
      to={item.link}
      className={`p-6 rounded-2xl text-white bg-gradient-to-r ${item.color}shadow-lg transform hover:scale-105 hover:shadow-xl transition duration-300`}
    >

      <div className="flex items-center justify-between">

        <div>
          <h3 className="text-lg font-semibold">
            {item.title}
          </h3>
          <p className="text-sm opacity-80">
            Manage {item.title.toLowerCase()}
          </p>
        </div>

        <div className="text-3xl">
          {item.icon}
        </div>

      </div>

    </Link>

  ))}

</div>

          {/* ================= QUICK INFO SECTION ================= */}

          <div className="grid md:grid-cols-2 gap-6">

            {/* complaints preview */}
            <div className="bg-white p-6 rounded-xl shadow">

              <h3 className="text-lg font-semibold mb-3">
                Recent Complaints
              </h3>

              <p className="text-gray-500 text-sm">
                View user issues and respond quickly.
              </p>

              <Link
                to="/admincomplaints"
                className="text-blue-600 mt-3 inline-block"
              >
                View All →
              </Link>

            </div>


            {/* users preview */}
            <div className="bg-white p-6 rounded-xl shadow">

              <h3 className="text-lg font-semibold mb-3">
                User Management
              </h3>

              <p className="text-gray-500 text-sm">
                Manage registered users and activity.
              </p>

              <Link
                to="/allusers"
                className="text-blue-600 mt-3 inline-block"
              >
                View Users →
              </Link>

            </div>

          </div>

        </div>

      </div>

      {/* footer */}
      <Footer />
    </>
  );
};

export default AdminHome;

