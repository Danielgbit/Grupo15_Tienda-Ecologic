const express = require ('express');
const productsRouter = express.Router();
const productsController = require ('../controllers/productsController');



productsRouter.get('/', productsController.products);

productsRouter.get('/:id/detail', productsController.productDetail);



module.exports = productsRouter;