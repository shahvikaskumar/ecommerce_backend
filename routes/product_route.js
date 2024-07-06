const express = require("express");
const router=express.Router();
const { Allproduct, Productcreate, Deleteproduct, Updateproduct, Singleproduct} = require('../controllers/product_controller');
const requireauth = require("../middleware/auth");
const uploadmiddleware = require("../functions/multer");
const Usertype = require("../middleware/usertype");


router.post('/product/create', requireauth, Usertype, Productcreate);
router.get('/product/all', Allproduct);
router.delete("/product/delete/:pid",requireauth, Usertype,Deleteproduct);
router.put("/product/update/:pid",requireauth, Usertype, uploadmiddleware, Updateproduct);
router.get('/product/:pid', Singleproduct );

module.exports = router;