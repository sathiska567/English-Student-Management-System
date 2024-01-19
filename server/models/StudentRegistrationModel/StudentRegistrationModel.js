const mongoose = require('mongoose');

const studentRegistrationDataModel = new mongoose.Schema({
        indexNumber:{
            type:String,
            required:["Index number is required",true]
        },

        fullName:{
            type:String,
            required:["Full Name is required",true]
        },

        nameWithinitial:{
            type:String,
            required:["Name with initial is required",true]
        },

        address:{
            type:String,
            required:["Address is required",true]
        },

        mobileNumber:{
            type:String,
            required:["Mobile Number is required",true]
        },

        Birthday:{
            type:Object,
            required:["BirthDay is required",true]
        },

        School:{
            type:String,
            required:["School is required",true]
        },

        currentBritishLevel:{
            type:String,
            required:["Current British English Level is required",true]
        },

        completedBritishLevel:{
            type:String,
            required:["Completed British English Level is required",true]
        },

        currentGeneralLevel:{
            type:String,
            required:["Current General English Level is required",true]
        },


        completedGeneralLevel:{
            type:String,
            required:["Completed General English Level is required",true]
        },

})


const StudentRecordsModel = mongoose.model('StudentRecords', studentRegistrationDataModel);

module.exports = StudentRecordsModel;