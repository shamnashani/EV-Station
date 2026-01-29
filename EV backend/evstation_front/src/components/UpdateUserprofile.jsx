import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const UpdateUserprofile = () => {
    const [name,setname]=useState('')
    const [address,setaddress]=useState('')
    const [phone,setphone]=useState('')
    const [photo,setphoto]=useState('')
    const nav=useNavigate()
    useEffect(()=>{
        const fetchdata=async()=>{
            const token=localStorage.getItem('token')
            const res=await axios.get('http://localhost:4000/user/userprofile',{
                headers:{Authorization:`Bearer ${token}`}
            })
            setname(res.data.name)
            setaddress(res.data.address)
            setphone(res.data.phone)
            setphoto(res.data.photo)

        }
        fetchdata()

    },[])
    const edit=async(e)=>{
      e.preventDefault()
      const token = localStorage.getItem("token")
      try{
        const res=await axios.post('http://localhost:4000/user/updateprofile',{name,address,phone,photo},
          {headers:{Authorization:`Bearer ${token}`,"Content-Type": "multipart/form-data"}})
        alert(res.data.message)
        nav('/userprofile')


      }catch(err){
      alert(err.response?.data?.message || "Update failed")      }

    }
  return (

<div>
      <h2>Update Profile</h2>
      <form onSubmit={edit}>
        <div>
          <label>Name:</label>
          <input type="text" value={name} onChange={e => setname(e.target.value)} />
        </div>

        <div>
          <label>Address:</label>
          <input type="text" value={address} onChange={e => setaddress(e.target.value)} />
        </div>

        <div>
          <label>Phone:</label>
          <input type="text" value={phone} onChange={e => setphone(e.target.value)} />
        </div>

        <div>
          <label>Photo URL:</label>
          <input type="file"  onChange={e => setphoto(e.target.files[0])} />
        </div>


        <button type="submit">Update Profile</button>
      </form>
    </div>  )
}

export default UpdateUserprofile