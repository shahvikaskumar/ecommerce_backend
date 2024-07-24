const mongoose = require("mongoose");
const usermodel= mongoose.model('user');
const { Cname, Capikey, Capisecret } = require("../utility/config");
const cloudinary = require('cloudinary').v2;


cloudinary.config({ 
    cloud_name: Cname, 
    api_key: Capikey, 
    api_secret: Capisecret
  });


//#region Get a single user detail
const Userdetail = async (req,res) => {
    console.log(req.params.id);
    try{
        const userid = req.params.id;
        
        // Find the user by ID and populate the following and followers fields
        let user = await usermodel.findById(userid).exec();
        
           
        
        if(!user){
            return res.status(404).json({message:'User not found'});
        }
        
        // Remove the password field from the user object
         user = user.toObject();
         delete user.password;

        return res.status(200).json({user});
    }
    catch (error){
        console.error(error);
        return res.status(500).json({message:'Server error'});
    }
};
//#endregion


//#region Get all user details excluding admin
const Getalluser = async(req,res) => {
    try {
        // Fetch all users excluding those with usertype 'admin'
        const users = await usermodel.find({ usertype: { $ne: 'admin' } }).select('_id name mobileno email profile_picurl address createdAt');

        // Check if there are users
        if (users.length === 0) {
            return res.status(404).json({ success: false, message: "No users found" });
        }

        // Send the list of users in the response
        res.status(200).json({ success: true, data: users });
        } catch (err) {
            console.log(err);
            res.status(500).json({ success: false, error: "An error occurred while retrieving users" });
        }
};
//#endregion

//#region Update UserDetail
const Updateuserdetail = async(req,res) => {
    try{
        const { name, mobileno, email, address} = req.body;
        const profile_picurl = req.file ? req.file.path : ''; 
        const profile_picpath = req.file ? req.file.filename : '';
        
        const userin= await usermodel.findById(req.params.uid);
        if (!product) {
            res.status(404).json({success:"Product not found"});
        }

        if(userin.profile_picpath && typeof userin.profile_picpath === 'string' && userin.profile_picpath.trim() !== '') {
            await cloudinary.uploader.destroy(userin.profile_picpath);
        }

        userin.name = name || userin.name;
        userin.mobileno = mobileno || userin.mobileno;
        userin.email = email || userin.email;
        userin.profile_picurl = profile_picurl || userin.profile_picurl;
        userin.profile_picpath = profile_picpath || userin.profile_picpath;
        userin.address = address || userin.address;

        await userin.save();
        res.status(200).json({success:"User Detail updated successfully.", user:userin});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error:"An error occured updating the User Detail."});
    }
};
//#endregion

module.exports = { Userdetail, Getalluser, Updateuserdetail };