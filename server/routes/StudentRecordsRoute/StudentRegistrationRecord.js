const express = require("express");
const { studentRegistrationRecordController } = require("../../controller/StudentRecordController/StudentRegistrationController");

const router = express.Router();

// CREATE STUDENT REGISTRATION ROUTES
router.post("/student-registration",studentRegistrationRecordController);


module.exports = router;