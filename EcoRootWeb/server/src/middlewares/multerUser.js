const multer = require('multer');
const path = require('path');



const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, './public/img/avatars');
    },
    filename: (req, file, cb) => {
        const newFileName = 'avatar' + '-' + Date.now() + path.extname(file.originalname);

        cb(null, newFileName);
    }
});

const upload = multer({ storage });

module.exports = upload;





