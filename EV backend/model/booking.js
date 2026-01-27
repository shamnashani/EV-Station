const mongo=require('mongoose')
const bookingschema=new mongo.Schema({
    user:{type:mongo.Schema.ObjectId,ref:'login',required:true},
    station:{type:mongo.Schema.ObjectId,ref:'station',required:true},
    startTime:{type:Date,required:true},
    endTime:{type:Date,required:true},
    status:{type:String, enum:['pending','confirmed','cancelled','completed'], default:['pending']},
    amount:{type:Number,default:0}
},{timestamps:true}
)
const booking=mongo.model('booking',bookingschema)
module.exports=booking