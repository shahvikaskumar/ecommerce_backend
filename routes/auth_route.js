const express = require("express");
const router=express.Router();
const { Authregister } = require("../controllers/auth_controller");

router.post('/auth/register', Authregister);


module.exports = router;