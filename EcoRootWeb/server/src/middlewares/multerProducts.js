const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, './public/img/products');
    },
    filename: (req, file, cb) => {

        const newFileName = 'img-product' + '-' + Date.now() + path.extname(file.originalname);

        cb(null, newFileName);
    }
});

const upload = multer({ storage });


module.exports = upload;