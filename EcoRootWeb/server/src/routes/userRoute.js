const express = require ('express');
const userRouter = express.Router();
const userController = require ('../controllers/userController');
const { validateLogin } = require('../validations/validateLogin');
const { validateRegister } = require('../validations/validateRegister');
const { validateuserEdit } = require('../validations/validateEditUser');
const guestMiddleware = require('../middlewares/guestMiddleware');
const upload = require('../middlewares/multerUser'); // Importa el multer de usuario
const isAuthenticated = require('../middlewares/authMiddleware');
const isAuthenticatedPassword = require('../middlewares/authFileMiddleware');





//@--POSTS-----

//@POST /api/order/create
userRouter.post('/user/order/create/:id', userController.postCreateOrder);

//@POST /user/register
userRouter.post('/user/create', [ upload.single('image'), isAuthenticatedPassword , validateRegister ], userController.postRegisterUser);

//@POST /user/login
userRouter.post('/user/login', validateLogin , userController.postLoginProcess);

//@POST /user/logout
userRouter.post('/user/logout', userController.postUserLogout);


userRouter.post('/user/addProductCart/:id', userController.postCreateProductCart);


userRouter.post('/destroy/session', userController.destroySession);




//@--DELETES-------


//@DELETE /user/:id/delete
userRouter.delete('/user/delete/:id', userController.deleteUser);

//@DELETE '/user/productInCart/delete'
userRouter.delete('/user/productInCart/delete/:productId', userController.deleteProductInCart);


userRouter.delete('/user/order/delete/:orderId', userController.deleteOrder);








//@--PUTS--------

// @PUT /user/edit/:id/
userRouter.put('/user/edit/:id', [upload.single('image'), validateuserEdit] , userController.putUpdateUser);

// @PUT /user/edit/:id/
userRouter.put('/user/productsInCart/update/:id', userController.putProductInCartUpdate);




//@--GETS--------


userRouter.get('/check/authentication/user', isAuthenticated ,userController.getCheckAuthUser);

//@GET /Regis
userRouter.get('/register/countries/data', userController.getCountriesDataRegister);

//@GET /login
userRouter.get('/login', guestMiddleware ,userController.getUserLogin);

// @GET /:id/edit
userRouter.get('/:id/edit', userController.getUserEdit);

// @GET /products
userRouter.get('/user/products/:id', userController.getUserProducts);

//@GET /api/orders
userRouter.get('/user/orders/:id', userController.getViewOrders);

//@GET /api/users
userRouter.get('/users', userController.getAllUsers);

//@GET /api/users
userRouter.get('/user/:id', userController.getFindOneUser);

//@GET /api/user/avatar/:id
userRouter.get('/user/avatar/:id', userController.getAvatar);

//@GET '/api/user/productsInCart/:id'
userRouter.get('/user/productsInCart/:id', userController.getProductsInCart);





module.exports = userRouter;