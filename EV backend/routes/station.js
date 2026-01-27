const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const station=require('../model/station')

//********************Add station[ADMIN] ******************/

router.post('/addstation',async(req,res)=>{
    try{
        const token=req.headers.authorization?.split(" ")[1]
        if(!token)
            return res.status(401).json({message:"no token provide"})
            const decode=jwt.verify(token,process.env.JWT_SECRET)
            if(decode.role!=="admin")
                return res.status(401).json({message:"Access Denied"})
            
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
        const token=req.headers.authorization?.split(" ")[1]
        if(!token){
          return  res.status(401).json({message:"Access Deneid"})
        }
        jwt.verify(token,process.env.JWT_SECRET)
        const stations=await station.find().limit(50)
        res.json(stations)
    }catch(err){
        res.status(500).json({message:err.message})}
})
module.exports=router