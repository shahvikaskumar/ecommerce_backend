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

    profile_picurl:{
        type:String,
    },

    profile_picpath:{
        type:String,
    },

    usertype:{
        type:String,
        required:true,
        enum:['cus','admin'],
    },

    address:{
        type:String,             
    },
    
    vtoken:{
        type:String,
    },

    vstatus:{
        type:String,
    },

    rptoken:{
        type:String,
    },

    rpexpires:{
        type:Date,
    },


},{timestamps:true});


userschema.pre('save',converttime);

mongoose.model('user', userschema);