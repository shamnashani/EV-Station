const express=require('express')
const app=express()
const cors=require('cors')
require('dotenv').config()
console.log(process.env.EMAIL_USER);
const db=require('./config/db')
db()
const login=require('./routes/login')
const user=require('./routes/user')
const station=require('./routes/station')
const booking=require('./routes/booking')
const payment=require('./routes/payment')
const complaint=require('./routes/complaint')
const admin=require('./routes/admin')
const Notification=require('./routes/notification')
const helmet = require('helmet');

app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  },
}));
app.use(express.static('media'))
app.use(express.urlencoded({
    extended:true
}))

app.use(cors());
app.use(express.json())
app.use('/login',login)
app.use('/user',user)
app.use('/station',station)
app.use('/booking',booking)
app.use('/pay',payment)
app.use('/com',complaint)
app.use('/admin',admin)
app.use('/noti',Notification)
const port=process.env.PORT||5000
app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
    
})