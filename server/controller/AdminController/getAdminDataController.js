const adminModel = require("../../models/AdminModel/AdminModel"); // Assuming correct path

const getDataController = async (req, res) => {
  try {
    const data = await adminModel.find({}); // Use await for asynchronous call

    res.status(200).send({
      success: true,
      message: "Data retrieved successfully", // More specific message
      data,
    });

  } catch (error) {
    console.error(error); // Log the error for debugging

    res.status(500).send({ // Use 500 for internal server errors
      success: false,
      message: "Error retrieving data", // More informative message
    });
  }
};

const postDataController = async(req,res)=>{
        try {
           const response = new adminModel(req.body)    
           await response.save()
           
           res.status(200).send({
                success:true,
                message:"Registered Successfully"
           })
        } catch (error) {
                res.status(400).send({
                        success:false,
                        message:"Registered Unsuccessfully"
                   })     
        }
}

module.exports = {getDataController,postDataController};