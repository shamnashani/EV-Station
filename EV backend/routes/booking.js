const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const station=require('../model/station')
const booking=require('../model/booking')
const user=require('../model/login')

router.post('/booking',async(req,res)=>{
    try{
   //{token from header
    //token means ID CARD that include evry info}
    const token=req.headers.authorization?.split(" ")[1]
    if(!token){
    return res.status(401).json({message:"invalid token"})
    } 
    //{ information from token}
    const decode=jwt.verify(token,process.env.JWT_SECRET)
    //get user id
    const User=await user.findById(decode.id)
    if(!User) return res.status(404).json({message:"user not fount"})

    const {stationId,startTime,endTime,amount}=req.body
    const Station=await station.findById(stationId)
    if(!Station) return res.status(401).json({message:"station not found"})

        const Booking=await booking.create({
            user:User._id,
            station:stationId,
            startTime,
            endTime,
            amount,
            status:'confirmed'


        })
        res.status(201).json(Booking)
            // reduce availableSlots
    if(station.availableSlots > 0) {
      station.availableSlots = station.availableSlots - 1
      await station.save();
    }

    }catch(err){
        return res.status(401).json({message:err.message})
    }
})

//get booking by user

router.get('/Vbooking',async(req,res)=>{
    try{
        const token=req.headers.authorization?.split(" ")[1]
        if(!token) return res.status(401).json({message:"invalid token"})
            const decode=jwt.verify(token,process.env.JWT_SECRET)
        const Book=await booking.find({user:decode.id}).populate('station').sort(-1)
        res.json(Book)
        

    }catch(err){
        return res.status(401).json({message:err.message})
    }
})
//cancel booking
router.put('/cancel/:id',async(req,res)=>{
    try{
        const token=req.headers.authorization?.split(" ")[1]//get token
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        const User=await user.findById(decode.id)
        if(!User) //get user
            return res.status(401).json("Unauthorized")
        const Book=await booking.findById(req.params.id)//get booking
        if(!Book)
            return res.status(404).json({message:"Booking not found"})
        if(Book==='cancelled')
            return res.status(404).json({message:"Already canceled"})
        //cancel
        Book.status='cancelled'
        await Book.save()
        //After cancel  Increase station slots
        const Station=await station.findById(Book.station)
        if(Station){
            Station.availableSlots=Station.availableSlots +1
            await Station.save()
        }
        res.json({message:"Booking Cancelled Successfully",availableSlots:Station.availableSlots})



    }catch(err){
        return res.status(500).json({message:err.message})
    }

})
module.exports=router