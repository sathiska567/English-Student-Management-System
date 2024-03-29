const studentRegistrationModel = require("../../models/StudentRegistrationModel/StudentRegistrationModel");

const updatePaymentController = async (req, res) => {
        try {

                const { updatedId, paidMonth,Paidyear} = req.body;
                console.log(updatedId, paidMonth,Paidyear);

                const updateUser = await studentRegistrationModel.findByIdAndUpdate(updatedId, { markPaymentCambrige: paidMonth , PaidyearCambrige:Paidyear }, { new: true });
                console.log(updateUser);
                if (!updateUser) {
                        return res.status(404).send({
                                success: false,
                                message: "Not Found User",
                        })
                }

                res.status(200).send({
                        success: true,
                        message: "Updated Successfull",
                        updateUser
                })

        } catch (error) {
                res.status(400).send({
                        success: false,
                        message: "Error in Updating Payment",
                        error
                })
        }
}


const updatePaymentControllerEloction = async (req,res) => {
        try {

                const { updatedId, paidMonth,Paidyear } = req.body;
                console.log(updatedId, paidMonth,Paidyear);

                const updateUser = await studentRegistrationModel.findByIdAndUpdate(updatedId, { markPaymentElocution: paidMonth , PaidyearElocution:Paidyear }, { new: true });
                console.log(updateUser);
                if (!updateUser) {
                        return res.status(404).send({
                                success: false,
                                message: "Not Found User",
                        })
                }

                res.status(200).send({
                        success: true,
                        message: "Updated Successfull",
                        updateUser
                })

        } catch (error) {
                res.status(400).send({
                        success: false,
                        message: "Error in Updating Payment",
                        error
                })
        }
}


const updatePaymentControllerGeneral = async (req,res) => {
        try {

                const { updatedId, paidMonth,Paidyear } = req.body;
                console.log(updatedId, paidMonth,Paidyear);

                const updateUser = await studentRegistrationModel.findByIdAndUpdate(updatedId, { markPaymentGeneral: paidMonth , PaidyearGeneral:Paidyear }, { new: true });
                console.log(updateUser);
                if (!updateUser) {
                        return res.status(404).send({
                                success: false,
                                message: "Not Found User",
                        })
                }

                res.status(200).send({
                        success: true,
                        message: "Updated Successfull",
                        updateUser
                })

        } catch (error) {
                res.status(400).send({
                        success: false,
                        message: "Error in Updating Payment",
                        error
                })
        }
}



module.exports = { updatePaymentController, updatePaymentControllerEloction,updatePaymentControllerGeneral }