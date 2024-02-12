const mongoose = require('mongoose');

const studentRegistrationDataModel = new mongoose.Schema({
        fullName:{
            type:String,
            required:["Full Name is required",true]
        },

        nameWithInitials:{
            type:String,
            required:["Name with initial is required",true]
        },

        email:{
            type:String,
            required:["Email required",true]
        },

        address:{
            type:String,
            required:["Address is required",true]
        },

        mobileNumber:{
            type:String,
            required:["Mobile Number is required",true]
        },

        birthday:{
            type:Object,
            required:["BirthDay is required",true]
        },

        school:{
            type:String,
            required:["School is required",true]
        },

        cambrige:{
            type:String,
            required:["Cambridge is required",true]
        },
        
        elocution:{
            type:String,
            required:["Cambridge is required",true]
        },

        general:{
            type:String,
            required:["Cambridge is required",true]
        },

        mothersMobileNumber:{
            type:String,
            required:["Mother's Mobile Number is required",true]
        },
        fathersMobileNumber:{
            type:String,
            required:["Farther's's Mobile Number is required",true]
        },
        GuardianMobileNumber:{
            type:String,
            required:["Guardian's Mobile Number is required",true]
        },
        grade:{
            type:Number,
            required:["Grade is required",true]
        },

        fartherName:{
            type:String,
            required:["Father's Name is required",true]
        },

        motherName:{
            type:String,
            required:["Mother's Name is required",true]
        },

        GuardianName:{
            type:String,
            required:["Guardian's Name is required",true]
        },

        fartherOccupation:{
            type:String,
            required:["farther Occupation is required",true]
        },

        motherOccupation:{
            type:String,
            required:["Mother Occupation is required",true]
        },

        GuardianOccupation:{
            type:String,
            required:["Guardian Occupation is required",true]
        },

        fartherEmail:{
            type:String,
            required:["Guardian Occupation is required",true]
        },

        motherEmail:{
            type:String,
            required:["Guardian Occupation is required",true]
        },

        GuardianEmail:{
            type:String,
            required:["Guardian Occupation is required",true]
        },

        PaidyearCambrige:{
            type:Number,
            
           },

        PaidyearGeneral:{
            type:Number,
            
           },

        PaidyearElocution:{
            type:Number,
            
           },

        markPaymentCambrige:{
            type:[String],
            default:[]
        },
        
        markPaymentGeneral:{
            type:[String],
            default:[]
        },

        markPaymentElocution:{
            type:[String],
            default:[]
        },

    
})


const StudentRecordsModel = mongoose.model('StudentRecords', studentRegistrationDataModel);

module.exports = StudentRecordsModel;