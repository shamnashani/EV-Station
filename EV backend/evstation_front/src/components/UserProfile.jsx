import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const UserProfile = () => {
  const [user, setuser] = useState('')
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token")

        const res = await axios.get("http://localhost:4000/user/userprofile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        )
        setuser(res.data)
      } catch (err) {
        alert("Unauthorized")
      }
    }
    fetchProfile()
  }, [])

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      <p>Address: {user.address}</p>
      <p>photo:<img src={'http://localhost:4000/'+user.photo} alt='profile pic' style={{height:'30px', width:'30px'}}></img></p>
      <button><Link to={'/editprofile'} >Edit</Link></button>
    </div>
  )
}

export default UserProfile
