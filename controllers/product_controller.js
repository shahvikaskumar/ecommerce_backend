const mongoose = require("mongoose");
const productmodel= mongoose.model('product');
const upload = require("../utility/multer");

const Productcreate = async (req,res) => {
    try{
        
        const { brand, cate, color, pfeatured , pdesc, pname, price, pspeci, subcate } = req.body;
        const image = req.file ? req.file.path : '';
        
        const product = new productmodel({
            brand,
            cate,
            color,
            image,
            pfeatured,
            pdesc,
            pname,
            price,
            pspeci,
            subcate,
    });

        await product.save();
        res.status(200).json({success:"Product created successfully."});
    }
    catch (err){
        console.error(err);
        res.status(500).json({error:"An error occurred during product creation."});
    }
};


const Productdetail = async (req, res) => {

    try{    
        const products = await productmodel.find();

        const baseurl = `${req.protocol}://${req.get('host')}/`;

        const pwithimgpath = products.map(product => ({
            ...product._doc,
            image:product.image ? baseurl + product.image.replace(/\\/g, '/') : null,
        }));
        res.status(200).json(pwithimgpath);
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:"An error occurred getting the all products."});
    }


} ;


module.exports = {Productcreate, Productdetail};

