const Razorpay = require('razorpay');
const { Rakeyid, Rakeysecret } = require('../utility/config');
const crypto = require('crypto');

const razorpay = new Razorpay({
    key_id:Rakeyid,
    key_secret:Rakeysecret
});


const Createorder = async (req,res) => {
    const {amount , currency,receipt} = req.body;

    const options = {
        amount:amount*100,
        currency,
        receipt
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    }
    catch (error){
        res.status(500).json(error);
    }
};


const Verifypayment = async (req,res) => {
    const { raorderid, rapayid, rasignature} = req.body;

    const shasum = crypto.createHmac('sha256', razorpay.key_secret);
    shasum.update(`${raorderid}|${rapayid}`);
    const digest = shasum.digest('hex');

    if(digest === rasignature){
        res.json({status:'Success'});
    }
    else {
        res.json({status:'failure'});
    }
};

module.exports = {Createorder, Verifypayment};
