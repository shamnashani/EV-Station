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
import BookingPage from './Booking'
import PaymentPage from './Payment'
import MyBookings from './Vbooking'
import PaymentComponent from './RazorPay'
import Complaint from './Complaint'
import MyComplaints from './ComplaintList'
import ResetPassword from './ResetPass'
import ForgotPassword from './ForgotPass'
import Menu from './Menu'
import EditStation from './EditStation'
import ManageStation from './MnageStation'
import AdminComplaints from './AdminComplaintList'
import AllUsers from './Alluser'
import Allbookings from './Allbookings'
import {  GoogleOAuthProvider } from '@react-oauth/google'
import Help from './Help'
import  Faq  from './Faq';
import Notification from './Notification'
import ProtectedRoute from './Route_for_protect'
import About from './About'
import Allpayments from './Allpayments'

function Routess() {
  return (
    <GoogleOAuthProvider clientId='153139542517-07pskqlbf1trn2jjo3onn5ihffkp2668.apps.googleusercontent.com'>
     <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
        <Route path='/login'element={<Login></Login>}></Route>
        <Route path='/userprofile' element={<UserProfile></UserProfile>}></Route>
        <Route path='/editprofile' element={<UpdateUserprofile></UpdateUserprofile>}></Route>
        <Route path='/userHome' element={<ProtectedRoute><UserHome></UserHome></ProtectedRoute>}></Route>
        <Route path='/adminhome' element={<ProtectedRoute><AdminHome></AdminHome></ProtectedRoute>}></Route>
        <Route path='/addStation' element={<StationAdd></StationAdd>}></Route>
        <Route path='/vStation' element={<ViewStation></ViewStation>}></Route>
        <Route path='/map' element={<Map></Map>}></Route>
        <Route path='/booking' element={<BookingPage></BookingPage>}></Route>
        <Route path='/pay' element={<PaymentPage></PaymentPage>}></Route>
        <Route path='/vbooking' element={<MyBookings></MyBookings>}></Route>
        <Route path='/razerpay' element={<PaymentComponent></PaymentComponent>}></Route>
        <Route path='/com' element={<Complaint></Complaint>}></Route>
        <Route path='/mycom' element={<MyComplaints></MyComplaints>}></Route>
        <Route path="/reset-password/:token" element={<ResetPassword></ResetPassword>}></Route>
        <Route path='/forgot-pass' element={<ForgotPassword></ForgotPassword>}></Route>
        <Route path='/menu' element={<Menu></Menu>}></Route>
        <Route path='/editStation/:id' element={<EditStation></EditStation>}></Route>
        <Route path='/manageStation' element={<ManageStation></ManageStation>}></Route>
        <Route path='/admin/com' element={<AdminComplaints></AdminComplaints>}></Route>
        <Route path='/admin/alluser' element={<AllUsers></AllUsers>}></Route>
        <Route path='/admin/allbookings' element={<Allbookings></Allbookings>}></Route>
        <Route path='/help' element={<Help></Help>}></Route>
        <Route path='/faq' element={<Faq></Faq>}></Route>
        <Route path='/notification' element={<Notification></Notification>}></Route>
        <Route path='/about' element={<About></About>}></Route>
        <Route path='/admin/payments' element={<Allpayments></Allpayments>}></Route>
      </Routes>
      </BrowserRouter>
      </GoogleOAuthProvider>
     
  )
}

export default Routess