const mongoose = require('mongoose');
const converttime = require('../Utility/converttime');

//#region Order Schema
const orderschema = new mongoose.Schema({

    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user',
        required:true
    },

    items:[
        {
            productid:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'product',
                require:true
            },
            qty:{
                type:Number,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
        },
    ],

    totalcost:{
        type:Number,
        required:true,
    },

    shipingcost:{
        type:Number,
        required:true,
    },

    totalamount:{
        type:Number,
        required:true
    },

    status:{
        type:String,
        default:'Pending'
    },

    payorderid:{
        type:String,
    },

    payid:{
        type:String
    },

    paysignature:{
        type:String
    },

    paystatus:{
        type:String,
    },

},{timestamps:true});
//#endregion

orderschema.pre('save',converttime);

mongoose.model('order', orderschema);