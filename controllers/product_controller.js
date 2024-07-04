const mongoose = require("mongoose");
const productmodel= mongoose.model('product');

//#region Create Product code
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
        res.status(200).json({success:"Product created successfully.",product:product});
    }
    catch (err){
        console.error(err);
        res.status(500).json({error:"An error occurred during product creation."});
    }
};
//#endregion

//#region Get Single Product code
const Singleproduct = async (req, res) => {
    try{
        const product = await productmodel.findById(req.params.pid);
        if(!product){
            return res.status(404).json({success:"Product not found"});
        } 

        const baseurl = `${req.protocol}://${req.get('host')}/`;

        const pwithimgpath = {
            ...product._doc,
            image:product.image ? baseurl + product.image.replace(/\\/g, '/') : null,
        };
        res.status(200).json({success:pwithimgpath});
    }
    catch(error){
        console.log(error);
        res.status(500).json({error:"An error occured whing getting product."});
    }
};
//#endregion

//#region  Get all Product code
const Allproduct = async (req, res) => {

    try{    
        const products = await productmodel.find();

        const baseurl = `${req.protocol}://${req.get('host')}/`;

        const pwithimgpath = products.map(product => ({
            ...product._doc,
            image:product.image ? baseurl + product.image.replace(/\\/g, '/') : null,
        }));
        res.status(200).json({success:pwithimgpath});
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:"An error occurred getting the all products."});
    }
};
//#endregion

//#region Delete Product code
const Deleteproduct = async (req,res) => {
    try{
        const product = await productmodel.findById(req.params.pid);
        if(!product){
            return res.status(404).json({success:'Product not found'});
        }

        await product.remove();
        res.status(200).json({success:"Product deleted successfully."});
    }
    catch(err){
        console.error(err);
        res.status(500).json({error:"An error occured deleting the product."})
    }
};
//#endregion

//#region Update Product code
const Updateproduct = async(req,res) => {
    try{
        const { brand, cate, color, pfeatured , pdesc, pname, price, pspeci, subcate } = req.body;
        const image = req.file ? req.file.path : '';
        
        const product = await productmodel.findById(req.params.pid);
        if(!product){
            res.status(404).json({success:"Product not found"});
        }

        product.brand = brand || product.brand;
        product.cate = cate || product.cate;
        product.subcate = subcate || product.subcate;
        product.color = color || product.color;
        product.image = image || product.image;
        product.pfeatured = pfeatured || product.pfeatured;
        product.pdesc = pdesc || product.pdesc;
        product.pname = pname || product.pname;
        product.price = price || product.price;
        product.pspeci = pspeci || product.pspeci;

        await product.save();
        res.status(200).json({success:"Product updated successfully."});

    }
    catch(err){
            console.log(err);
            res.status(500).json({error:"An error occured updating the product."});
    }
};
//#endregion


module.exports = {Productcreate, Allproduct, Deleteproduct, Updateproduct, Singleproduct};

