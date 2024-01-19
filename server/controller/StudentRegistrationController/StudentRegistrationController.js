const StudentRegistrationModel = require('../../models/StudentRegistrationModel/StudentRegistrationModel');

const studentRegistrationController = async(req,res)=>{
   try {

        const {courseLevel} = req.body
        console.log(courseLevel);
       
        const studentRegistration = await StudentRegistrationModel({
                courses:courseLevel
        })

        studentRegistration.save();

        console.log(studentRegistration);

        
   } catch (error) {
        
   }


}


module.exports = {studentRegistrationController};