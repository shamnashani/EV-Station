import React from 'react'
import {BrowserRouter,Route,Routes } from 'react-router-dom'
import Home from '../components/Home'
import Signup from './Signup'
import Login from './Login'
import UserProfile from './UserProfile'
import UpdateUserprofile from './UpdateUserprofile'
import UserHome from './UserHome'
import AdminHome from './AdminHome'
import StationAdd from './StationAdd'
import ViewStation from './ViewStation'
import Map from './Map'
function Routess() {
  return (
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/login'element={<Login></Login>}></Route>
        <Route path='/userprofile' element={<UserProfile></UserProfile>}></Route>
        <Route path='/editprofile' element={<UpdateUserprofile></UpdateUserprofile>}></Route>
        <Route path='/userHome' element={<UserHome></UserHome>}></Route>
        <Route path='/adminhome' element={<AdminHome></AdminHome>}></Route>
        <Route path='/addStation' element={<StationAdd></StationAdd>}></Route>
        <Route path='/vStation' element={<ViewStation></ViewStation>}></Route>
        <Route path='/map' element={<Map></Map>}></Route>
      </Routes>
      </BrowserRouter>
     
  )
}

export default Routess