const mongoose = require("mongoose");
const usermodel= mongoose.model('user');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const { JWT_SECRET } = require('../Utility/config');

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
            else if(userindb.mobileno === Number(mobileno)){
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

//#region Auth login
const Authlogin = async(req,res) => {
    const {email,password }=req.body;

    if(!email || !password){
        return res.status(400).json({error:"Email or password are empty."});        
    }

    try{
        const userin = await usermodel.findOne({email: email});
        if(!userin){
            return res.status(401).json({error:"Email Id is not registered."});
        }
        
        const ismatch = await bcryptjs.compare(password, userin.password);
        if(!ismatch){
            return res.status(401).json({error:"Invalid email or password."});
        }
        
        const token=jwt.sign({userID:userin._id}, JWT_SECRET, {expiresIn:'1h'});
        const user = userin.toObject();
        delete user.password;
        
        res.status(200).json({success:"Login Successfully", token ,user});
        

    }
    catch (err){
        console.error(err);
        res.status(500).json({error:"An error occurred during the login process"});
    }
};
//#endregion

//#region Auth verify
const Authverify = (req,res) => {
    res.status(200).json({valid:true,user:req.userID});   
}
//#endregion


module.exports = {Authregister, Authlogin, Authverify};