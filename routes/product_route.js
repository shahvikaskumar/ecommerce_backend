const express = require("express");
const router=express.Router();
const { Productdetail, Productcreate } = require('../controllers/product_controller');
const requireauth = require("../middleware/auth");
const uploadmiddleware = require("../utility/multer");
const Usertype = require("../middleware/usertype");


router.post('/createproduct', requireauth, Usertype, uploadmiddleware, Productcreate);
router.get('/allproducts', requireauth, Usertype, Productdetail);


module.exports = router;