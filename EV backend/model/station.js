const mongo=require('mongoose')
const stationSchema=new mongo.Schema({
    name:{type:String,required:true},
    location:{type:String,required:true},
    latitude:{type:String,required:true},
    longitude:{type:String,required:true},
    availableSlots:{type:Number,default:0},
    chargerTypes:[String],
    priceperHour:{type:Number,default:0},
    description:String
},{timestamps:true}
)
const station=mongo.model('station',stationSchema)
module.exports=station