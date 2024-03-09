const mongoose = require("mongoose")

const adminSchema = new mongoose.Schema({
       email:{
        type:String,
       },
       
       password:{
        type:String,
       }
})


const adminModel = mongoose.model("admin",adminSchema)  //collection name is "Payment"

module.exports = adminModel;