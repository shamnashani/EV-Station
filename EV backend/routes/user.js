const express=require('express')
const router=express.Router()
const jwt=require('jsonwebtoken')
const user=require('../model/login')
const authMiddleware=require('../middleware/authMiddleware')
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
router.get('/userprofile',authMiddleware,async(req,res)=>{
    try{
         

        const User=await user.findById(req.user.id).select('-password')
        if(!User){
            return res.status(404).json({message:"user not fount"})
        }
        res.json(User)

    }catch(err){
        return res.status(401).json({message:err.message})

    }
})

//******************{profile update}****************
router.post('/updateprofile',authMiddleware,upload.single('photo'),async(req,res)=>{
    try{

        //update 
        const {name,address,phone}=req.body
        const photo=req.file.filename
        const User=await user.findByIdAndUpdate(
            req.user.id , //user to update by id
            {name,address,phone,photo},{new:true}//return updated fields
        ).select("-password")  // Remove password from response

        res.json({message:"profile updated",User})

    }catch(err){
        return res.status(401).json({message:err.message})
    }


})

//******************user home************** */
router.get('/home',authMiddleware,async(req,res)=>{

    res.json({message:`Welcome ${req.user.name}`,email:req.user.email,role:req.user.role})
    


})

module.exports=router