const StudentRegistrationModel = require('../../models/StudentRegistrationModel/StudentRegistrationModel')

const studentRegistrationRecordController = async(req,res)=>{

        try {
          const {indexNumber,fullName,nameWithinitial,address,mobileNumber,Birthday,School,currentBritishLevel,completedBritishLevel,currentGeneralLevel,completedGeneralLevel} = req.body
                
        } catch (error) {
                
        }

}


module.exports = {studentRegistrationRecordController}