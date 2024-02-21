const express = require("express");
const { GetCourseViseStudentDetailsController } = require("../../controller/GetCourseViseStudentDetailsController/GetCourseViseStudentDetailsController");

const router = express.Router();

router.get("/course-vise",GetCourseViseStudentDetailsController)


module.exports = router;