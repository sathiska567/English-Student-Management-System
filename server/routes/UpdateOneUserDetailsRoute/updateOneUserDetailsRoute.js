const express = require("express");
const { updatePaymentController,updatePaymentControllerEloction } = require("../../controller/UpdateOneUserControll/updateOneUserControll");

const router = express.Router()

// UPDATE DETAILS IN CAMBRIGE
router.post("/update-payment-cambrige",updatePaymentController)


// UPDATE DETAILS IN ELOCUTION
router.post("/update-payment-elocution",updatePaymentControllerEloction)


module.exports = router;
