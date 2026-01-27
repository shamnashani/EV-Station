const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const user=require('../model/login')
const multer=require('multer')
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'media')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+".jpg")
    }
})
const upload=multer({storage:storage})
//***********************{profile view}**********************
router.get('/userprofile',async(req,res)=>{
    try{
        //{token from header
        //token means ID CARD that include evry info}
        const token=req.headers.authorization?.split(" ")[1]
        if(!token){
           return res.status(401).json({message:"invalid token"})
        } 
        //{ information from token}
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        const User=await user.findById(decode.id).select('-password')
        if(!User){
            return res.status(404).json({message:"user not fount"})
        }
        res.json(User)

    }catch(err){
        return res.status(401).json({message:err.message})

    }
})

//******************{profile update}****************
router.post('/updateprofile',upload.single('photo'),async(req,res)=>{
    try{
        const token=req.headers.authorization?.split(" ")[1]
        if(!token){
           return res.status(401).json({message:"invalid token"})
        } 
        //{ information from token}
        const decode=jwt.verify(token,process.env.JWT_SECRET)

        //update 
        const {name,address,phone}=req.body
        const photo=req.file.filename
        const User=await user.findByIdAndUpdate(
            decode.id , //user to update by id
            {name,address,phone,photo},{new:true}//return updated fields
        ).select("-password")  // Remove password from response

        res.json({message:"profile updated",User})

    }catch(err){
        return res.status(401).json({message:err.message})
    }


})

//******************user home************** */
router.get('/home',async(req,res)=>{
    const token=req.headers.authorization?.split(" ")[1]
    const decode=jwt.verify(token,process.env.JWT_SECRET)
    if(!token)
        return res.status(401).json({message:"invalid token"})
    res.json({message:`Welcome ${decode.name}`,email:decode.email,role:decode.role})
    


})

module.exports=router