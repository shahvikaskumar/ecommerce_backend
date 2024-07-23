const express = require("express");
const router=express.Router();
const { Userdetail, Updateuserdetail, Getalluser } = require('../controllers/user_controller');
const upload = require("../utility/multer");
const requireauth = require("../middleware/auth");
const Usertype = require("../middleware/usertype");


router.get('/user/:id', Userdetail);
router.get('/users/all',requireauth, Usertype, Getalluser);
router.put("/user/update/:uid",requireauth, upload, Updateuserdetail);

module.exports = router;