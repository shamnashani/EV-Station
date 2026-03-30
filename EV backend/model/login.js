const mongo=require('mongoose')
const loginscheema=new mongo.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,unique:true,lowercase:true},
    password:{type:String,required:true},
    role:{type:String,required:true,enum:["admin","user"]},
    address:{type:String},
    phone: {type:String},
    photo:String,
    resetToken: String,
    resetTokenExpiry: Date,
    status: { 
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  },
  online: {
    type: Boolean,
    default: false
   
}
},{timestamps:true}
) 
const login=mongo.model('login',loginscheema)
module.exports=login