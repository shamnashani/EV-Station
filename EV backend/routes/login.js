const express=require('express')
const nodemailer =require('nodemailer')
const router=express.Router()
const multer=require('multer')
const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const login = require('../model/login')
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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
    if(!name||!email||!password) return res.json({message:"Missing field"})
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
         if(user.status === "inactive"){
      return res.status(403).json({
        message:"Your account is deactivated by admin"
      })
    }
        const matchpass=await bcrypt.compare(password,user.password)
        if(!matchpass)
            return res.status(400).json({message:'Invalid Credentials'})
        await login.findByIdAndUpdate(user._id,{
      online:true
    })

        const token=jwt.sign({id:user._id,role:user.role,name:user.name},process.env.JWT_SECRET,{expiresIn:'1d'})
        res.json({message:"Login successful",token, user:{id:user._id,name:user.name,email:user.email,role:user.role}})


    }catch(err){
        res.status(500).json({message:err.message})
    }
})
//google login
router.post("/google-login", async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(400).json({ message: "No token provided" });
    }

    // Verify Google token
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    const { name, email, picture} = payload;

    // Check user
    let user = await login.findOne({ email });

    if (!user) {
      // Create new user
      user = new login({
        name,
        email,
        password: null, // no password for Google users
        role: "user",
        photo: picture, // store Google profile pic
      });

      await user.save();
    }

    // Check if blocked
    if (user.status === "inactive") {
      return res.status(403).json({
        message: "Your account is deactivated by admin",
      });
    }

    // Update online status
    await login.findByIdAndUpdate(user._id, {
      online: true,
    });

    // Create JWT (same as your login)
    const jwtToken = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Google login successful",
      token: jwtToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Google login failed" });
  }
});

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await login.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // create token
    const resetToken = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    const resetLink = `http://localhost:3000/reset-password/${resetToken}`;

    // transporter 
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    //  send email 
    await transporter.sendMail({
      from: `"EV Charging" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <h2>Password Reset</h2>
        <p>Click below to reset your password:</p>
        <a href="${resetLink}" 
        style="padding:10px 20px;background:#0ea5e9;color:white;text-decoration:none;border-radius:5px;">
          Reset Password
        </a>
        <p>This link expires in 15 minutes.</p>
      `,
    });

    res.json({ message: "Password reset link sent to your email" });


  } catch (error) {
    console.error("FORGOT ERROR:", error);
    res.status(500).json({ message: "Error sending email" });
  }
});

router.post("/reset-password/:token", async (req, res) => {
  try {
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }
         console.log("Received Token:", req.params.token);

    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await login.findByIdAndUpdate(decoded.id, {
      password: hashedPassword,
    });

    res.json({ message: "Password reset successful" });

  } catch (err) {
    console.error("RESET ERROR:", err);
    res.status(400).json({ message: "Invalid or expired token" });
  }
});


router.post("/logout",async(req,res)=>{
  try{

    const {userId} = req.body

    await login.findByIdAndUpdate(userId,{
      online:false
    })

    res.json({
      message:"Logout successful"
    })

  }catch(err){
    res.status(500).json({message:err.message})
  }
})



module.exports= router
