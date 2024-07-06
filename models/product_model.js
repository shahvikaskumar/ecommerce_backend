const mongoose = require('mongoose');
const converttime = require('../Utility/converttime');

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

}, { timestamps: true });

productschema.pre('save',converttime);

module.exports = mongoose.model('product', productschema);
