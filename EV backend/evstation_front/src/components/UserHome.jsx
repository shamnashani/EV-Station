import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'



const UserHome = () => {
  const [data,setdata]=useState('')
  useEffect(()=>{
    const token=localStorage.getItem('token')

    const fetchHome=async()=>{
      const res= await axios.get("http://localhost:4000/user/home",{
        headers:{Authorization:`Bearer ${token}`}
      })
    alert(res.data.message)
    setdata(res.data)
    }
    fetchHome()

  },[])

    
  return (
    <div>
      <h2>{data.message}</h2>
      <Link to={"/vStation"}>View station</Link>

    </div>

  )
}

export default UserHome