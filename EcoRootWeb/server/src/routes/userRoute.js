const express = require ('express');
const userRouter = express.Router();
const userController = require ('../controllers/userController');
const { validateLogin } = require('../validations/validateLogin');
const { validateRegister } = require('../validations/validateRegister');
const { validateuserEdit } = require('../validations/validateEditUser');
const guestMiddleware = require('../middlewares/guestMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const upload = require('../middlewares/multerUser'); // Importa el multer de usuario


//@ /user/
userRouter.get('/', authMiddleware ,userController.getUserPage);

//@GET /user/login

userRouter.get('/login', guestMiddleware ,userController.login);

//@POST /user/login

userRouter.post('/login', validateLogin , userController.loginProcess);

//@POST /user/register

userRouter.post('/register', [ upload.single('image'), validateRegister ], userController.postRegisterUser);

//@GET /user/register

userRouter.get('/register', guestMiddleware, userController.register);

//@GET /user/logout

userRouter.get('/logout', userController.logout);

// @GET /user/:id/edit

userRouter.get('/:id/edit', userController.getEdit);

// @GET /user/products

userRouter.get('/products', userController.getUserProducts);

// @PUT /products/:id/detail

userRouter.put('/:id/user', [upload.single('image'), validateuserEdit] , userController.updateUser);

//@POST /user/:id/delete

userRouter.delete('/:id/delete', userController.deleteUser);

//@POST /user/order/create
userRouter.post('/order/create', userController.createOrder);

//@GET /user/orders
userRouter.get('/orders', userController.viewOrders);

//@GET /users
userRouter.get('/users', userController.getAllUsers);

//@GET /user/:id
userRouter.get('/:id/detail', userController.userDetail)


userRouter.get('/user/avatar/:id', userController.userAvatar);


module.exports = userRouter;