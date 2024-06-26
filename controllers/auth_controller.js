const mongoose = require("mongoose");
const usermodel= mongoose.model('user');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcrypt');
// const { JWT_SECRET } = require('../utility/config');

//#region Auth Register api
const Authregister = async (req,res) => {
    const {fname, mobileno, email,password, utype}= req.body;
    
    if (!fname || !email || !mobileno || !password || !utype){
        return res.status(400).json({error:"One or more fields are empty"});
    }

    try{
        const userindb = await usermodel.findOne({$or:[{email:email},{mobileno:mobileno}]});
        
        if(userindb){
            if(userindb.email=== email){
                return res.status(409).json({error:"This email already registered."});
            }       
            else if(userindb.mobileno === mobileno){
                return res.status(409).json({error:"Mobile no already registered."});
            }
        }
        
        const hashedpassword = await bcryptjs.hash(password, 12);

        const newuser = new usermodel({name:fname,email:email,mobileno:mobileno,password:hashedpassword,usertype:utype});
        await newuser.save();

        res.status(201).json({success:"Registration successfully."});
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:"An error occurred during the signup process."});
    }
};
//#endregion


module.exports = {Authregister};