import axios from 'axios'
import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import '../App.css'

const StationAdd = () => {
    const [name, setname] = useState('')
    const [location, setlocation] = useState('')
    const [latitude, setlatitude] = useState('')
    const [longitude, setlongitude] = useState('')
    const [availableSlots,setavailabeSlots]=useState('')
    const [chargerTypes,setchargerTypes]=useState('')
    const [priceperHour,setpriceperHour]=useState('')
    const nav=useNavigate()

    const fetchlocation=async()=>{
        try{
            const res=await axios.get('https://nominatim.openstreetmap.org/search',{
                params:{                   //after nomination url for place , formate and set limit 1 for the chance of multiple point 
                    q:location,
                    format:'json',
                    limit:1

                }
            })
            if(res.data.length>0){
                setlatitude(res.data[0].lat)//first data comes 
                setlongitude(res.data[0].lon)

            }

        }catch(err)
        {
            alert('Unable to fetch coordinates of location')
        }
    }
        const addStation=async(e)=>{
            e.preventDefault()
            try{
            const token=localStorage.getItem('token')
            const res=await axios.post('http://localhost:4000/station/addstation',
                {name,location,latitude,longitude,chargerTypes:chargerTypes.split(","),priceperHour,availableSlots
            },{
                headers:{Authorization:`Bearer ${token}`}
            })
            alert(res.data.message)
            nav('/adminhome')
        }catch(err){
  alert( "Error")        }

        }
    return (
        <div>
            <form onSubmit={addStation}>
                <h2>Add Station</h2>
                <input type='text' placeholder='Station Name' value={name} onChange={(e)=>setname(e.target.value)}></input><br></br><br></br>
                <input type='text' placeholder='Location' value={location} onChange={(e)=>setlocation(e.target.value)}
                onBlur={(e)=>fetchlocation(e.target.value)}></input><br></br><br></br>
                <input type='text' placeholder='available Slots' value={availableSlots} onChange={(e)=>setavailabeSlots(e.target.value)}></input><br></br><br></br>
                <input type='text' placeholder='Charger Types' value={chargerTypes} onChange={(e)=>setchargerTypes(e.target.value)}></input><br></br><br></br>
                <input type='text' placeholder='Price per Hour' value={priceperHour} onChange={(e)=>setpriceperHour(e.target.value)}></input><br></br><br></br>
                <button type='submit'>Add Station</button>
                
            </form>
        </div>
    )
}

export default StationAdd