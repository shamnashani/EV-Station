const mongoose=require('mongoose')
const complaintschema=new mongoose.Schema({
    user:{type:mongoose.Schema.ObjectId,ref:'login' ,required:true},
    stationName:{type:mongoose.Schema.ObjectId,ref:'station' ,required:true},
    category: {type: String,
    enum: ["Payment Issue",
    "Charging Station Problem",
    "Refund Request",
    "Slot Booking Issue",
    "Other"],
  required: true,
},
message:{type:String},
Reply:{typr:String},
status: {type: String,enum: ["pending", "in-progress", "resolved", "withdrawn"],default: "pending"},
},
{ timestamps: true })
const Complaint = mongoose.model("Complaint", complaintschema)
module.exports=Complaint

