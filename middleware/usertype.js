const Usertype = (req, res, next ) => {
    
    if(req.userID['usertype'] === 'admin'){
        next();
    }else{
        res.status(401).json({success:"You are not authorized for perform this action."});
    }
};

module.exports = Usertype;