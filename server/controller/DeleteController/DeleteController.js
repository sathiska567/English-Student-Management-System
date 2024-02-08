const studentRecordModel = require('../../models/StudentRegistrationModel/StudentRegistrationModel');

const deleteController = async (req, res) => {

        try {
                const { id } = req.body;

                console.log(id);

                const data = await studentRecordModel.findByIdAndDelete(id);
                res.status(200).send({
                        success: true,
                        message: "Student Record Deleted Successfully",

                })

        } catch (error) {
                res.status(400).send({
                        success: true,
                        message: "Error in Delete Controller",
                        error
                })
        }

}


module.exports = { deleteController }