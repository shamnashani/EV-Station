const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const station=require('../model/station')
const authMiddleware = require('../middleware/authMiddleware')
const adminMiddleware = require('../middleware/adminMiddleware')

//********************Add station[ADMIN] ******************/

router.post('/addstation',authMiddleware,adminMiddleware,async(req,res)=>{
    try{
            const {name,location,latitude,longitude,availableSlots,chargerTypes,priceperHour,description}=req.body
            if(!name || !location || !latitude || !longitude ) return res.json({message:"Missing Fields"})
            const stations=new station({
            name,
            location,
            latitude,
            longitude,
            availableSlots,
            chargerTypes,
            priceperHour,
            description

            }) 
            await stations.save()
            res.json({message:"Station Added Successfully",stations})


    }catch(err){
        return res.status(500).json({message:err.message})


    }

})
//***********************************view station***************** */
router.get('/Sview',async(req,res)=>{
    try{

        const stations=await station.find().limit(50)
        res.json(stations)
    }catch(err){
        res.status(500).json({message:err.message})}
})
module.exports=router