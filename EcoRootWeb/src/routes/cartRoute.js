const express = require ('express');
const cartRouter = express.Router();
const cartController = require ('../controllers/cartController');


cartRouter.get('/', cartController.cart);


module.exports = cartRouter;