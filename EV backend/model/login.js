const mongo=require('mongoose')
const loginscheema=new mongo.Schema({
    name:{type:String,required:true,trim:true},
    email:{type:String,required:true,unique:true,lowercase:true},
    password:{type:String,required:true},
    role:{type:String,required:true,enum:["admin","user"]},
    address:{type:String,required:true},
    phone: {type:String},
    photo:String,
   
},
 {timestamps:true}
) 
const login=mongo.model('login',loginscheema)
module.exports=login