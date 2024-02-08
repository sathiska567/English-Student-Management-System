const express = require('express');
const { deleteController } = require('../../controller/DeleteController/DeleteController');

// CREATE ROUTER
const router = express.Router();


// CREATE DELETE ROUTER || POST
router.post("/delete-route",deleteController)




module.exports = router;