const express = require ('express');
const userRouter = express.Router();
const userController = require ('../controllers/userController');
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, './public/img/avatars');
    },
    filename: (req, file, cb) => {

        console.log(req.file);

        const newFileName = 'img-user' + '-' + Date.now() + path.extname(file.originalname);

        cb(null, newFileName);
    }
});

const upload = multer({ storage });


//@ /user/login


userRouter.get('/login', userController.login);

userRouter.post('/register', upload.single('image') , userController.postRegisterUser);

userRouter.get('/register', userController.register);



module.exports = userRouter;