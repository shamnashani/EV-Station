const mongo=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()
const db=async()=>{
    await mongo.connect(process.env.MONGODB)
    console.log("connected");
    

}
module.exports=db