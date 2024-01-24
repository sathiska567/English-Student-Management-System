const paymentModel = require("../../models/PaymentRecordModel/PaymentRecordModel");

const paymentRecordController = async(req,res)=>{
    try {

        const { year,indexNumber,fullName,courseTitle,courseLevel,payment } = req.body;

        console.log(year,indexNumber,fullName,courseTitle,courseLevel,payment);

       const response = new paymentModel({
           year:year,
           indexNumber:indexNumber,
           fullName:fullName,
           courseTitle:courseTitle,
           courseLevel:courseLevel,
           payment:payment           
       })

       await response.save();

       res.status(200).send({
         success:true,
         message:"Payment Record Added Successfully",
         response
       })
        
    } catch (error) {
        res.status(400).send({
                success:false,
                message:"Error While Getting Payment Record",
                error
        })
    }     
    
}

module.exports = {paymentRecordController};