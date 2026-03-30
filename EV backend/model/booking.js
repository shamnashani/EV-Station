const mongo=require('mongoose')
const bookingschema=new mongo.Schema({
    user:{type:mongo.Schema.ObjectId,ref:'login',required:true},
    station:{type:mongo.Schema.ObjectId,ref:'station',required:true},
    date:{type:String ,required:true},
    timeSlot:{type:String,required:true},
    vehicleNo:{type:String,required:true},
    status:{type:String, enum:['pending','confirmed','cancelled','completed'], default:'pending'},
    amount:{type:Number,default:0}
},{timestamps:true}
)
const booking=mongo.model('booking',bookingschema)
module.exports=booking