const { default: mongoose } = require('mongoose')
const mongo=require('mongoose')
const paymentschema=new mongo.Schema({
    booking:{type:mongoose.Schema.ObjectId,ref:'booking',required:true},
    user:{type:mongoose.Schema.ObjectId,ref:'login',required:true},
    amount:{type:Number,required:true},
    status:{type:String,enum:['pending','paid','failed'],default:'pending'},
    transactionId:{type:String,required:true}

},{timestamps:true}
)
const payment=mongo.model('payment',paymentschema)
module.exports=payment