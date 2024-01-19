const mongoose = require('mongoose');

const studentRegistrationSchema = new mongoose.Schema({
    courses:{
        type:[String]
    }
   
})


const studentRegistration = mongoose.model('studentRegistration', studentRegistrationSchema);


module.exports = studentRegistration;