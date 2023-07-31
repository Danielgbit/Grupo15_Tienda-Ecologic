const express = require ('express');
const userRouter = express.Router();
const userController = require ('../controllers/userController');


userRouter.get('/login', userController.login);


userRouter.get('/register', userController.register);


module.exports = userRouter;