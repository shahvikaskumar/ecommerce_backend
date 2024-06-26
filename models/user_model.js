const mongoose = require('mongoose');
const converttime = require('../Utility/converttime');

const userschema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    
    mobileno:{
        type:Number,
        unique:true,
        required:true
    },

    email:{
        type:String,
        unique:true,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    profile_picture:{
        type:String,
    },

    usertype:{
        type:String,
        required:true,
        enum:['cus','admin'],
    },

    address:{
        type:[Map],
        of:String,        
    },    


},{timestamps:true});


userschema.pre('save',converttime);

mongoose.model('user', userschema);