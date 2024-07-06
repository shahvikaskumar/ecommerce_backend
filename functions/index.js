const express=require('express');
const cors=require('cors');
const conn = require('../Utility/connectdb');
const authroutes = require('../routes/auth_route');
const serverless = require('serverless-http');


const userroutes = require('../routes/user_route');
const productroutes = require('../routes/product_route');
// const tweetroutes = require('./routes/tweet_route');
const app=express();
const port=5000;

app.use(cors());

app.use(express.json());

app.use('/.netlify/functions/index', authroutes);
app.use('/.netlify/functions/index', userroutes);
app.use('/.netlify/functions/index', productroutes);
// app.use('/api',userroutes);

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

module.exports.handler = serverless(app);