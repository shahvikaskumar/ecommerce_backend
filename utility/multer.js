const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Function to ensure directory exists
const ensuredirexists = (dir) => {
    if(!fs.existsSync(dir)){
        fs.mkdirSync(dir,{recursive:true});
    }
};

// Check file type
function checkfiletype(file, cb){
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    const mimetype = filetypes.test(file.mimetype);

    if(mimetype && extname){
        return cb(null, true);
    }
    else {
        cb('Error: Images Only!');
    }
};    

// Set up storage engine
const storage = multer.diskStorage({
    destination:(req, file,cb) => {
        const {cate,subcate} = req.headers;        
        const imgdir = `./images/products/${cate}/${subcate}`;
        ensuredirexists(imgdir);
        cb(null,imgdir);
    },
    filename:(req, file, cb) => {        
        cb(null,'img-' + Date.now()  + "-" + file.originalname);
    }
});

// Initialize upload
const upload  = multer({
    storage:storage,        
    limits:{ fileSize:1000000},
    fileFilter: (req,file, cb) => {            
        checkfiletype(file, cb);
    }
}).single('image');


const uploadmiddleware = async (req, res, next) => {
    upload(req ,res, (err) => {        
        if(err){
            return res.status(400).json({success:err.response?.data?.error});
        }
        next();        
});

    
}

module.exports = uploadmiddleware;