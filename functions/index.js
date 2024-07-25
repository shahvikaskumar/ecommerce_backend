const express=require('express');
const cors=require('cors');
const conn = require('../Utility/connectdb');
const serverless = require('serverless-http');

// Import routes
const authroutes = require('../routes/auth_route');
const userroutes = require('../routes/user_route');
const productroutes = require('../routes/product_route');
const paymentroutes = require('../routes/payment_route');
const orderroutes = require('../routes/order_route');

const app=express();
const port=5000;

// Enable CORS
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Consider using different base paths for clarity
app.use('/.netlify/functions/index', authroutes);
app.use('/.netlify/functions/index', userroutes);
app.use('/.netlify/functions/index', productroutes);
app.use('/.netlify/functions/index', paymentroutes);
app.use('/.netlify/functions/index', orderroutes);


const startserver = async   () => {
    try{
        await conn()
        app.listen(port, () => {
            console.log(`Server is running on a ${port}`);
        });
    }
    catch (error)
    {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startserver();

// Export the serverless handler
module.exports.handler = serverless(app);