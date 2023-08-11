const express = require('express');
const productsRouter = express.Router();
const productsController = require('../controllers/productsController');


// @GET /products
productsRouter.get('/', productsController.products);

productsRouter.post('/', productsController.postProductCreate);


// @GET /products/id/detail
productsRouter.get('/:id/detail', productsController.productDetail);

// CREATE

// @GET /products/create
productsRouter.get('/create', productsController.getproductCreate);


// @DELETE /products/:id/delete
productsRouter.delete('/:id/delete', productsController.productDestroy);

//EDIT


// @GET /products/:id/edit
productsRouter.get('/:id/edit', productsController.getEdit);

// @GET /products/:id/detail
productsRouter.put('/:id/detail', productsController.putProductEdit);








module.exports = productsRouter;