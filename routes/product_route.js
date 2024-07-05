const express = require("express");
const router=express.Router();
const { Allproduct, Productcreate, Deleteproduct, Updateproduct, Singleproduct } = require('../controllers/product_controller');
const requireauth = require("../middleware/auth");
const uploadmiddleware = require("../utility/multer");
const Usertype = require("../middleware/usertype");


router.post('/product/create', requireauth, Usertype,  uploadmiddleware,  Productcreate);
router.get('/product/all', Allproduct);
router.delete("/product/delete/:pid",requireauth, Usertype,Deleteproduct);
router.put("/product/update/:pid",requireauth, Usertype, uploadmiddleware, Updateproduct);
router.get('/product/:pid', Singleproduct );

module.exports = router;