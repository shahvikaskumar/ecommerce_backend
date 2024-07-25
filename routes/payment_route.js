const express = require("express");
const router=express.Router();
const requireauth = require("../middleware/auth");
const { Createorder, Verifypayment } = require("../controllers/payment_controller");

// Payment Regarding routes
router.post('/payment/createorder', requireauth, Createorder );
router.post('/payment/verifypayment', requireauth ,Verifypayment);


module.exports = router;