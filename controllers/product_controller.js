const mongoose = require("mongoose");
const productmodel= mongoose.model('product');
const fs = require('fs');
const path = require('path');
const { Cname, Capikey, Capisecret } = require("../utility/config");
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: Cname, 
    api_key: Capikey, 
    api_secret: Capisecret
  });

//#region Calculating Average Rating
const calculateAverageRating = (ratingsArray) => {
    if (!ratingsArray || ratingsArray.length === 0) {
      return { averageRating: 0, count: 0 }; // Handle case with no ratings or undefined ratingsArray
    }
  
    const totalRating = ratingsArray.reduce((sum, rating) => sum + rating.ratingno, 0);
    const averageRating = Math.round((totalRating / ratingsArray.length) * 10) / 10;
  
    return { averageRating, count: ratingsArray.length };
};
//#endregion

//#region Create Product code
const Productcreate = async (req,res) => {
    try{               
        const { brand, cate, color, pfeatured , pdesc, pname, price, pspeci, subcate } = req.body;
        const imageurl = req.file ? req.file.path : ''; 
        const imagepath = req.file ? req.file.filename : '';      
            
        const product = new productmodel({
            brand,
            cate,
            color,
            imagepath,
            imageurl,
            pfeatured,
            pdesc,
            pname,
            price,
            pspeci,
            subcate,
    });

        await product.save();
        res.status(200).json({success:"Product created successfully.", product:product});
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
        res.status(200).json({success:product});
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
        if(!products){
            return res.status(404).json({success:"Products not found"});
        }
        res.status(200).json({success:products});
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
        const product = await productmodel.findById({_id:req.params.pid});
        if(!product){
            return res.status(404).json({success:'Product not found'});
        }
        
        if (product.imagepath && typeof product.imagepath === 'string' && product.imagepath.trim() !== '') {
        await cloudinary.uploader.destroy(product.imagepath);
        }

        await product.deleteOne();
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
        const imageurl = req.file ? req.file.path : '';
        const imagepath = req.file ? req.file.filename : '';      

        const product = await productmodel.findById(req.params.pid);
        if (!product) {
            res.status(404).json({success:"Product not found"});
        }

        if(product.imagepath && typeof product.imagepath === 'string' && product.imagepath.trim() !== '') {
        await cloudinary.uploader.destroy(product.imagepath);
        }

        product.brand = brand || product.brand;
        product.cate = cate || product.cate;
        product.subcate = subcate || product.subcate;
        product.color = color || product.color;
        product.imageurl = imageurl || product.imageurl;
        product.imagepath = imagepath || product.imagepath;
        product.pfeatured = pfeatured || product.pfeatured;
        product.pdesc = pdesc || product.pdesc;
        product.pname = pname || product.pname;
        product.price = price || product.price;
        product.pspeci = pspeci || product.pspeci;

        await product.save();
        res.status(200).json({success:"Product updated successfully.", product:product});

    }
    catch(err){
            console.log(err);
            res.status(500).json({error:"An error occured updating the product."});
    }
};
//#endregion

//#region Product rating code
const Productrating = async (req, res) => {
    try {
        const { uid, ratingno } = req.body;
        const productId = req.params.pid;

        // Find the product by its ID
        const product = await productmodel.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // Check if the user has already rated the product
        const existingRatingIndex = product.pratings.findIndex(rating => rating.user.toString() === uid);

        if (existingRatingIndex !== -1) {
            // Update the existing rating
            product.pratings[existingRatingIndex].ratingno = ratingno;
        } else {
            // Add a new rating
            product.pratings.push({ user: uid, ratingno });
        }

        const { averageRating, count } = calculateAverageRating(product.pratings);

        product.pavgrating=averageRating;
        product.pcountrating=count;

        // Save the updated product
        await product.save();

        res.status(200).json({success: "Product rating updated successfully", product:product});
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: "An error occurred applying the product rating." });
    }
};
//#endregion

module.exports = {Productcreate,Productrating, Allproduct, Deleteproduct, Updateproduct, Singleproduct};
