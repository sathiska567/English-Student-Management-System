const express = require('express');
const { paymentRecordController } = require('../../controller/PaymentRecordsController/paymentRecordController');

const router = express.Router();

// PAYMENT RECORDS ROUTE
router.post("/payment-record",paymentRecordController)


module.exports = router;