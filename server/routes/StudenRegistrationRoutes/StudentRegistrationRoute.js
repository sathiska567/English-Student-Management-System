const express = require('express');
const { studentRegistrationController } = require('../../controller/StudentRegistrationController/StudentRegistrationController');

const router = express.Router();

// CREATE USER REGISTRATION || POST
router.post("/studentRecords",studentRegistrationController)


module.exports = router;