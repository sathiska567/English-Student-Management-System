const express = require("express");
const { studentRegistrationRecordController,getStudnetRegistrationDetails,getOneUserRegistrationDetails,deleteStudentRecord,updateStudentRecord} = require("../../controller/StudentRecordController/StudentRegistrationController");

const router = express.Router();

// // CREATE STUDENT REGISTRATION ROUTES || POST
// router.post("/student-registration",studentRegistrationRecordController);


// GET ALL STUDENT REGISTRATION DATA || GET
router.get("/get-student-details",getStudnetRegistrationDetails)


// GET ONE USER DETAILS USING ID || POST
router.post("/get-only-one-user-details",getOneUserRegistrationDetails)


// DELETE STUDENT RECORD ROUTE || POST
router.post("/delete-student-record",deleteStudentRecord)


// HANDLE STUDENT RECORD UPDATE ROUTE || POST
router.post("/update-student-record",updateStudentRecord)


module.exports = router;