const mongoose = require('mongoose');
const {MONGODB_URL} = require('./config');
const user = require('../models/user_model');
const products = require('../models/product_model');
const order = require('../models/order_model');


// Function to connect to MongoDB Database
const connectdb = async () => {
    
    try{
        await mongoose.connect(MONGODB_URL);
        console.log("Database connection successfully");
         user;
         products;
         order;
        
    }
    catch (error){
        if(error.name === 'MongooseServerSelectionError'){
            console.error('Error: Connection refused. Please check if your MongoDB server is running and accessible.');
        }
        else {
            console.error('Error while  connecting to Database server:', error);
        }
        process.exit(1);
    }
}

module.exports=connectdb;