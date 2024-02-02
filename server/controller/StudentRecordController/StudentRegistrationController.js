const StudentRegistrationModel = require('../../models/StudentRegistrationModel/StudentRegistrationModel')

// student registration controller
const studentRegistrationRecordController = async(req,res)=>{

        try {
           console.log(req.body);

           const studentDataRegister = new StudentRegistrationModel(req.body)

           await studentDataRegister.save();

           console.log(studentDataRegister);

           res.status(200).send({
                success:true,
                message:"Student Registration Record Added Successfully",
                data:studentDataRegister
           })
                
        } catch (error) {

            res.status(400).send({
                success:false,
                message:"Student Registration Record Added Unsuccessfully",
                error
             
            })    
        }

}


// registered student detials get controller
const getStudnetRegistrationDetails = async(req,res)=>{

        try {
          const AllRegistereddetails = await StudentRegistrationModel.find({})

          console.log(AllRegistereddetails);
          
          res.status(200).send({
                success:true,
                message:"Student Registration Record Fetched Successfully",
                AllRegistereddetails
          })
                
        } catch (error) {
          res.status(400).send({
                success:false,
                message:"Student Registration Record Fetched Unsuccessfully",
                error
            })   
        }
}


// get only one user registration details
const getOneUserRegistrationDetails = async(req,res)=>{
  try {
    const {id} = req.body

    const details = await StudentRegistrationModel.findOne({_id:id})

     if(!details){
       return res.status(404).send({
         success:false,
         message:"Student Registration Record Not Found",
       })
     }

     res.status(200).send({
       success:true,
       message:"Student Registration Record Fetched Successfully",
       details
     })
    
    
  } catch (error) {
     res.status(400).send({
       success:false,
       message:"Student Registration Record Fetched Unsuccessfully",
       error
     })
    
  }
  
}


// delete student controller
const deleteStudentRecord = async(req,res)=>{
  try {
    const {id} = req.body
    const response = await StudentRegistrationModel.findByIdAndDelete({_id:id})

    res.status(200).send({
      success:true,
      message:"Student Registration Record Deleted Successfully",
    })
    
  } catch (error) {
     res.status(400).send({
      success:false,
      message:"Student Registration Record Deleted Unsuccessfully"
     })
  }

}


// Update Student records
const updateStudentRecord = async(req,res)=>{
   try {
    console.log(req.body);
    const {id} = req.body
    const response = await StudentRegistrationModel.findByIdAndUpdate({_id:id},
    {
      indexNumber:req.body.values.indexNumber,
      fullName:req.body.values.fullName,
      nameWithInitials:req.body.values.nameWithInitials,
      address:req.body.values.address,
      mobileNumber:req.body.values.mobileNumber,
      birthday:req.body.values.birthday,
      school:req.body.values.school,    
    },{new:true})

    if(!response){
      return res.status(404).send({
        success:false,
        message:"Student Registration Record Not Found",
      })
    }

    res.status(200).send({
      success:true,
      message:"Student Registration Record Updated Successfully",
      response
    })
    
   } catch (error) {
    res.status(400).send({
      success:true,
      message:"Student Registration Record Updated Unsuccessfully",
      error
    })
   }
}


module.exports = {studentRegistrationRecordController,getStudnetRegistrationDetails,getOneUserRegistrationDetails,deleteStudentRecord,updateStudentRecord}