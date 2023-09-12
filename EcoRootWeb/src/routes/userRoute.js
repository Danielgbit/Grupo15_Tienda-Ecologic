const express = require ('express');
const userRouter = express.Router();
const userController = require ('../controllers/userController');
const path = require('path');
const { validateLogin } = require('../middlewares/validateLogin');
const { validateRegister } = require('../middlewares/validateRegister');
const multer = require('multer');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');


// MULTER
const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, './public/img/avatars');
    },
    filename: (req, file, cb) => {

        console.log(req.file);

        const newFileName = 'avatar' + '-' + Date.now() + path.extname(file.originalname);

        cb(null, newFileName);
    }
});

const upload = multer({ storage });

//@ /user/
userRouter.get('/', authMiddleware ,userController.getUserPage);

//@GET /user/login

userRouter.get('/login', guestMiddleware ,userController.login);

//@POST /user/login

userRouter.post('/login', validateLogin , userController.loginProcess);

//@POST /user/register

userRouter.post('/register', [upload.single('image'), validateRegister] , userController.postRegisterUser);

//@GET /user/register

userRouter.get('/register', guestMiddleware, userController.register);

//@GET /user/logout

userRouter.get('/logout', userController.logout);

// @GET /user/:id/edit

userRouter.get('/:id/edit', userController.getEdit);

// @PUT /products/:id/detail

userRouter.put('/:id/user', userController.updateUser);

//@POST /user/:id/delete

userRouter.delete('/:id/delete', userController.deleteUser);





module.exports = userRouter;