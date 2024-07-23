const express = require("express");
const router=express.Router();
const { Allproduct, Productcreate, Deleteproduct, Updateproduct, Singleproduct, Productrating} = require('../controllers/product_controller');
const requireauth = require("../middleware/auth");
const upload = require("../utility/multer");
const Usertype = require("../middleware/usertype");



router.post('/product/create', requireauth, Usertype , upload, Productcreate);
router.get('/product/all', Allproduct);
router.delete("/product/delete/:pid",requireauth, Usertype,Deleteproduct);
router.put("/product/update/:pid",requireauth, Usertype, upload, Updateproduct);
router.get('/product/:pid', Singleproduct );
router.post('/product/rating/:pid',requireauth, Productrating);
module.exports = router;