const mongoose = require("mongoose")

const paymentSchema = new mongoose.Schema({
       year:{
        type:Date,
        required:["Please enter year",true]
       },

       indexNumber:{
         type:String,
         required:["Please enter index number",true]
       },

       fullName:{
         type:String,
         required:["Please enter Full name",true]
       },

       courseTitle:{
         type:String,
         required:["Please enter course title",true]
       },

       courseLevel:{
         type:String,
         required:["Please enter course level",true]
       },
       payment:{
        type:String,
        required:["Please enter payment",true]
       }
})


const paymentModel = mongoose.model("Payment",paymentSchema)  //collection name is "Payment"

module.exports = paymentModel;