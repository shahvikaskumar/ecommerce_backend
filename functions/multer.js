const fs = require('fs/promises'); // Using promises for fs operations
const path = require('path');
const Busboy = require('busboy');

// Function to ensure directory exists
const ensureDirExists = async (dir) => {
  if (!fs.existsSync(dir)) {
    await fs.mkdir(dir, { recursive: true });
  }
};

// Check file type
function checkFileType(filename) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(filename).toLowerCase());
  return extname;
}

async function uploadmiddleware(req, res, next) {
  const { cate, subcate } = req.headers;
  const imgDir = `./images/products/${cate}/${subcate}`; // Corrected

  await ensureDirExists(imgDir);

  const busboy = new Busboy({ headers: req.headers });
  let imgdata = null;

  busboy.on('file', async (fieldname, file, filename, encoding, mimetype) => {
    if (!checkFileType(filename)) {
      return res.status(400).json({ success: 'Error: Images Only!' });
    }
    console.log(filename);
    imgdata = path.join(imgDir, `img-${Date.now()}-${filename}`);
    await file.pipe(fs.createWriteStream(imgdata));
  });

  busboy.on('finish', () => {
    res.status(200).json({ message: imgdata }); // Assuming success response
  });

  busboy.on("error", (err) => {
    console.error(err);
    res.status(400).json({ message: err.message });
  });

  await req.body.pipe(busboy);
}

module.exports = uploadmiddleware;
