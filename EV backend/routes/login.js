const express=require('express')
const router=express.Router()
const multer=require('multer')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const login = require('../model/login')
require('dotenv').config()
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'media')
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+".jpg")
    }
})
const upload=multer({storage:storage})

// ************user Signup**********************

router.post('/signup',upload.single('photo'),async(req,res)=>{
     try {
    const {name,email,password,role,address,phone}=req.body
      const photo=req.file ? req.file.filename : null;
    if(!name||!email||!password||!address) return res.json({message:"Missing field"})
    const user=await login.findOne({email:email})
    if(user) return res.json({message:"Email Exist"})
    const salt=await bcrypt.genSalt(10)
    const hashed=await bcrypt.hash(password,salt)

        const newUser=new login({
            name,
            email,
            password:hashed,
            role: role || "user",
            address,
            phone,
            photo
        })
         await newUser.save()
        const token=jwt.sign({id:newUser._id,role:newUser.role},process.env.JWT_SECRET,{expiresIn:'1d'})
        res.json({token,user:{id:newUser._id,name:newUser.name,email:newUser.email,role:newUser.role}})
        } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }

})

// Login

router.post('/loginn',async(req,res)=>{
    console.log("user:", req.body)
    try{
        const {email,password}=req.body
        const user=await login.findOne({email})
        if(!user)
            return res.status(400).json({message:'Invalid Credentials'})
        const matchpass=await bcrypt.compare(password,user.password)
        if(!matchpass)
            return res.status(400).json({message:'Invalid Credentials'})
        const token=jwt.sign({id:user._id,role:user.role,name:user.name},process.env.JWT_SECRET,{expiresIn:'1d'})
        res.json({token, user:{id:user._id,name:user.name,email:user.email,role:user.role}})


    }catch(err){
        res.status(500).json({message:err.message})
    }
})


module.exports= router
