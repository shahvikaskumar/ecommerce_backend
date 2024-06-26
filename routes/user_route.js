const express = require("express");
const router=express.Router();
const { Userdetail } = require('../controllers/user_controller');


router.get('/user/:id', Userdetail);


module.exports = router;