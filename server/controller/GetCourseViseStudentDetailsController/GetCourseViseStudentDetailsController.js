const studentRecord = require("../../models/StudentRegistrationModel/StudentRegistrationModel");

const GetCourseViseStudentDetailsController = async (req, res) => {
        try {
                const cambrigeArray = [];
                const elocutionArray = [];
                const generalArray = [];
                
                const data = await studentRecord.find({});

                // Filter records based on the condition
                const filteredDataCambrige = data.filter((student) => student.cambrige === "Cambridge Assessment");

                // Filter records based on the condition
                const filteredDataElocution = data.filter((student) => student.elocution === "Elocution Exams");
                // console.log(filteredDataElocution);

                // Filter records based on the condition
                const filteredDataGeneral = data.filter((student) => student.general === "General English");

                // Check if any records match the condition
                if (filteredDataCambrige.length > 0) {
                        cambrigeArray.push(filteredDataCambrige);
                }

               if(filteredDataElocution.length > 0){
                        elocutionArray.push(filteredDataElocution);
                }

                if(filteredDataGeneral.length > 0){
                       generalArray.push(filteredDataGeneral) 
                }                

                res.status(200).send({
                        success: true,
                        message: "Student Details",
                        cambrige : cambrigeArray,
                        elocution : elocutionArray,
                        general : generalArray,                        
                });
                

        } catch (error) {
                res.status(500).send({
                        success: false,
                        message: "Error fetching student details",
                        error: error.message,
                });
        }

}


module.exports = { GetCourseViseStudentDetailsController };