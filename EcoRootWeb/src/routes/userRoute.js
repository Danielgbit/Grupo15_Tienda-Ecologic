const express = require ('express');
const userRouter = express.Router();
const userController = require ('../controllers/userController');
const path = require('path');
const { validateLogin } = require('../middlewares/validateLogin');
const { validateRegister } = require('../middlewares/validateRegister');
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

//@ /user/
userRouter.get('/', userController.getUserPage);

//@GET /user/login

userRouter.get('/login', userController.login);

//@POST /user/login

userRouter.post('/login', validateLogin , userController.loginProcess);

//@POST /user/register

userRouter.post('/register', [upload.single('image'), validateRegister] , userController.postRegisterUser);

//@GET /user/register

userRouter.get('/register', userController.register);





module.exports = userRouter;