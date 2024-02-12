const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
       year:{
        type:Date,
        required:["Please enter year",true]
       },
       
       payment:{
        type:String,
        required:["Please enter payment",true]
       }
})


const paymentModel = mongoose.model("Payment",paymentSchema)  //collection name is "Payment"

module.exports = paymentModel;