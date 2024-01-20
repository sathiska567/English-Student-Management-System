const StudentRegistrationModel = require('../../models/StudentRegistrationModel/StudentRegistrationModel')

const studentRegistrationRecordController = async(req,res)=>{

        try {
           console.log(req.body.currentBritishLevel);

          //  const studentDataRegister = new StudentRegistrationModel({
          //   indexNumber:req.body.indexNumber,
          //   fullName:req.body.fullName,
          //   nameWithInitials:req.body.nameWithInitials,
          //   address:req.body.address,
          //   mobileNumber:req.body.mobileNumber,
          //   Birthday:req.body.birthday,
          //   School:req.body.school,
          //   currentBritishLevel:req.body.currentBritishLevel,
          //   completedBritishLevel:req.body.completedBritishLevels,
          //   currentGeneralLevel:req.body.currentGeneralLevel,
          //   completedGeneralLevel:req.body.completedGeneralLevels,
          //  })

          //  await studentDataRegister.save();

          //  console.log(studentDataRegister);
                
        } catch (error) {
                
        }

}


module.exports = {studentRegistrationRecordController}