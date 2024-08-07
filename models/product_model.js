const mongoose = require('mongoose');
const converttime = require('../Utility/converttime');

//#region  Product Schema
const productschema = new mongoose.Schema({
    pname: {
        type: String,
        required: true
    },
    cate: {
        type: String,
        required: true
    },

    subcate: {
        type: String,
        required: true
    },

    pfeatured:{
        type:String,
    },

    brand: {
        type: String,
        
    },
    pdesc: {
        type: String,
        
    },

    price:{
        type:String,
        required:true
    },

    color:{
        type:String,
        
    },
    pspeci:{
        type:String,
        
    },

    imagepath:{
        type:String,
    },

    imageurl:{
        type:String,        
    },

    pratings: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                
            },
            ratingno: {
                type: Number,
                min: 1,
                max: 5,
            
            }
        }
    ],

    pavgrating:{
        type:Number,
        default:0

    },

    pcountrating:{
        type:Number,
        default:0
    },

}, { timestamps: true });
//#endregion

productschema.pre('save',converttime);

module.exports = mongoose.model('product', productschema);
