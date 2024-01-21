const express = require("express");
const { studentRegistrationRecordController,getStudnetRegistrationDetails,getOneUserRegistrationDetails} = require("../../controller/StudentRecordController/StudentRegistrationController");

const router = express.Router();

// CREATE STUDENT REGISTRATION ROUTES || POST
router.post("/student-registration",studentRegistrationRecordController);


// GET ALL STUDENT REGISTRATION DATA || GET
router.get("/get-student-details",getStudnetRegistrationDetails)


// GET ONE USER DETAILS USING ID || POST
router.post("/get-only-one-user-details",getOneUserRegistrationDetails)


module.exports = router;