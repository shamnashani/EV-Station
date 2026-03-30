const express=require('express')
const router=express.Router()
const user=require('../model/login')
const booking=require('../model/booking')
const payment=require('../model/payment')
const station=require('../model/station')
const adminMiddleware =require('../middleware/adminMiddleware')
const Complaint = require('../model/complaint')
const authMiddleware = require('../middleware/authMiddleware')

//get all users
router.get('/getAll',adminMiddleware,async(req,res)=>{
    try{
    const totalUser=await user.find()
    const totalStation=await station.find()
    const totalPayment=await payment.find()
    const totalBooking=await booking.find()

    res.json({users:totalUser,payments:totalPayment,stations:totalStation,bookings:totalBooking})
    
    }catch(err){
        res.status(500).json({message:message.err})
    }
})

//get all stations
router.get('/allStation',adminMiddleware,async(req,res)=>{
    try{
    const Station=await station.find()
    res.json({Station})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

//get single station

router.get('/station/:id',adminMiddleware,async(req,res)=>{
    try{
        const Station=await station.findById(req.params.id)
        res.json({Station})

    }catch(err){
        res.status(500).json({message:err.message})

    }
})

//delete Station

router.delete('/dlt/:id',adminMiddleware,async(req,res)=>{
    try{
        const Station=await station.findByIdAndDelete(req.params.id)
        res.json({Station})

    }catch(err){
        res.status(500).json({message:err.message})

    }
})

//update Station

router.put('/updateStation/:id',adminMiddleware,async(req,res)=>{
    try{
        const Station=await station.findByIdAndUpdate(req.params.id,
            req.body //the station data from frontend
            ,{new:true}
        )
        res.json({message:"station updated successfully",Station:Station})
    }catch(err){
        res.status(500).json({message:err.message})
    }
})
//get complaint

router.get('/getcom',adminMiddleware,async(req,res)=>{
    try{
        const com=await Complaint.find().populate("user","name email").sort({ createdAt: -1 })

    res.json(com)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})
 //reply for complaint

 router.put("/replyComplaint/:id", adminMiddleware, async (req, res) => {

  try {

    const { reply } = req.body

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      {
        Reply: reply,
        status: "resolved" 
      },
      { new: true }
    )

    res.json({
      message: "Reply sent successfully",
      complaint
    })

  } catch (err) {

    res.status(500).json({ message: err.message })

  }

})

// get all user
router.get('/allUser',adminMiddleware,async(req,res)=>{
    try{
        const allUser=await user.find({role:'user'})
        res.json(allUser)

    }catch(err){
          res.status(500).json({ message: err.message })

    }
})

//active user
router.put('/active/:id',adminMiddleware,async(req,res)=>{
    try{
        const active=await user.findByIdAndUpdate(req.params.id,{status:'active'},{new:true})
        res.json({message:'User Activated',active})

    }catch(err){
        res.status(500).json({ message: err.message })

    }
})

//deactive user
router.put('/inactive/:id',adminMiddleware,async(req,res)=>{
    try{
        const deactive=await user.findByIdAndUpdate(req.params.id,{status:'inactive'},{new:true})
        res.json({message:'User Deactivated',deactive})

    }catch(err){
        res.status(500).json({ message: err.message })

    }
})

//get all bookings 
router.get('/allbookings',adminMiddleware,async(req,res)=>{
    try{
        const bookings=await booking.find().populate('user','name email').populate('station','name location priceperHour').sort({createAt:-1})
        res.json(bookings)

    }catch(err){
                res.status(500).json({ message: err.message })

    }
})
//all payments
router.get('/allpayments',adminMiddleware,async(req,res)=>{
    try{
        const payments=await payment.find().populate('user','name email').populate('booking').sort({createAt:-1})
        res.json(payments)

    }catch(err){
                res.status(500).json({ message: err.message })

    }
})

router.get("/booking-stats", async (req, res) => {
  try {

    const stats = await booking.aggregate([
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" }, // 1=Sun, 7=Sat
          total: { $sum: 1 }
        }
      }
    ])

    // convert to full week format
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

    const result = Array(7).fill(0)

    stats.forEach(s => {
      result[s._id - 1] = s.total
    })

    res.json(result)

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Error fetching stats" })
  }
})

router.get("/revenue-stats", async (req, res) => {
  try {

    const stats = await payment.aggregate([
      {
        $match: { status: "paid" } // only successful payments
      },
      {
        $group: {
          _id: { $dayOfWeek: "$createdAt" },
          total: { $sum: "$amount" }
        }
      }
    ])

    const result = Array(7).fill(0)

    stats.forEach(s => {
      result[s._id - 1] = s.total
    })

    res.json(result)

  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Error fetching revenue" })
  }
})

module.exports=router