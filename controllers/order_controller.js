const mongoose = require("mongoose");
const ordermodel= mongoose.model('order');

const Createneworder = async(req, res) => {
    try{

        const {userid,items,totalcost,shipingcost,totalamount,status,payorderid,payid,paysignature, paystatus} = req.body;
        const neworder = new ordermodel({userid,items,totalcost,shipingcost,totalamount,status,payorderid,payid,paysignature, paystatus});
        await neworder.save();
        res.status(200).json({success:"Order succesfully Placed." , data:neworder});
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:"An error occurred during Order creation."});
    }
    
};

const Updateorder = async(req,res) => {
    try{
        const {userid,items,totalcost,shipingcost ,totalamount,status,payorderid,payid,paysignature, paystatus} = req.body;        
        const order = await ordermodel.findById(req.params.oid);
        if (!order) {
            res.status(404).json({success:"Order not found"});
        }

        order.userid = userid || order.userid;
        order.items = items || order.items;
        order.totalcost = totalcost || order.totalcost;
        order.shipingcost = shipingcost || order.shipingcost;
        order.totalamount = totalamount || order.totalamount;
        order.status = status || order.status;
        order.payorderid = payorderid || order.payorderid;
        order.payid = payid || order.payid;
        order.paysignature = paysignature || order.paysignature;
        order.paystatus = paystatus || order.paystatus;
        
        await order.save();
        res.status(200).json({success:"Order updated succesfully", data:order});

    }
    catch(error){
        console.error(error);
        res.status(500).json({error:"An error occurred during Order updation."});
    }
};

const Getuserorder = async(req,res) => {
    try{
        const {userid} = req.params;        
        const orders = await ordermodel.find({userid:userid})
            .populate({path:'userid' , select:'-password'})
            .populate({path:'items.productid'}).exec();
        res.status(200).json({success:"Order received.", data:orders});
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:"An error occurred during Get order."});
    }
};

const Getallorder = async(req,res) => {
    try{
        const orders = await ordermodel.find()
            .populate({path:'userid' , select:'-password'})
            .populate({path:'items.productid'}).exec();
        res.status(200).json({success:"all order received.", data:orders});       
    }
    catch(error){
        console.error(error);
        res.status(500).json({error:"An error occurred during Get all order."});
    }
};

module.exports = { Createneworder, Updateorder, Getuserorder, Getallorder };