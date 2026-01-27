const express=require('express')
const app=express()
const cors=require('cors')
require('dotenv').config()
const db=require('./config/db')
db()
const login=require('./routes/login')
const user=require('./routes/user')
const station=require('./routes/station')
const booking=require('./routes/booking')

app.use(express.static('media'))
app.use(express.urlencoded({
    extended:true
}))

app.use(cors())
app.use(express.json())
app.use('/login',login)
app.use('/user',user)
app.use('/station',station)
app.use('./booking',booking)
const port=process.env.PORT||5000
app.listen(port,()=>{
    console.log(`http://localhost:${port}`);
    
})