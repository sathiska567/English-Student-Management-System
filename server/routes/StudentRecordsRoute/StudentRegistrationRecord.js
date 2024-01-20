const express = require("express");
const { studentRegistrationRecordController,getStudnetRegistrationDetails} = require("../../controller/StudentRecordController/StudentRegistrationController");

const router = express.Router();

// CREATE STUDENT REGISTRATION ROUTES || POST
router.post("/student-registration",studentRegistrationRecordController);


// GET ALL STUDENT REGISTRATION DATA || GET
router.get("/get-student-details",getStudnetRegistrationDetails)


module.exports = router;