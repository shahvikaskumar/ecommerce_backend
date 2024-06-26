const mongoose = require("mongoose");

const usermodel= mongoose.model('user');


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

module.exports = { Userdetail };