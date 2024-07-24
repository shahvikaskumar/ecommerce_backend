const express = require("express");
const router=express.Router();
const requireauth = require("../middleware/auth");
const { Createneworder, Getuserorder, Getallorder, Updateorder } = require("../controllers/order_controller");
const Usertype = require("../middleware/usertype");



router.post('/order/createorder', requireauth, Createneworder  );
router.get('/order/getorder/:userid', requireauth ,Getuserorder);
router.get('/order/getorder', requireauth, Usertype ,Getallorder);
router.put('/order/update/:oid', requireauth, Usertype, Updateorder);

module.exports = router;

