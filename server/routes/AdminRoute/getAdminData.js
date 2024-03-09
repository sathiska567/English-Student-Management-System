const express = require('express');
const { getDataController,postDataController } = require('../../controller/AdminController/getAdminDataController');

// CREATE ROUTER
const router = express.Router();


// CREATE DELETE ROUTER || POST
router.get("/get-router",getDataController)

// CREATE DELETE ROUTER || POST
router.post("/post-router",postDataController)




module.exports = router;