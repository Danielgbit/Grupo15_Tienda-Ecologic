const express = require('express');
const productsRouter = express.Router();
const productsController = require('../controllers/productsController');
const { productCreateValidations } = require('../validations/validateProductCreate');
const productEditValidations = require('../validations/validateProductEdit');
const upload = require('../middlewares/multerProducts'); // Importa el multer de usuario





// @GET /products
productsRouter.get('/', productsController.products);

productsRouter.post('/', [upload.single('image'), productCreateValidations ]  , productsController.postProductCreate);


// @GET /products/id/detail
productsRouter.get('/:id/detail', productsController.productDetail);

// CREATE

// @GET /products/create
productsRouter.get('/create', productsController.getproductCreate);


// @DELETE /products/:id/delete
productsRouter.delete('/:id/delete', productsController.productDestroy);

//EDIT

// @GET /products/:category_id/categories
productsRouter.get('/:category_id/category', productsController.getproductCategory);


// @GET /products/:id/edit
productsRouter.get('/:id/edit', productsController.getEdit);


// @PUT /products/:id/detail
productsRouter.put('/:id/detail',  [ productEditValidations.productEditValidations ], productsController.putProductEdit);


// @GET /products/search
productsRouter.get('/search', productsController.getSearchProduct);


//CART

// @POST /products/addToCart
productsRouter.post('/addTocart', productsController.addToCart);


// @GET /products/cart
productsRouter.get('/cart', productsController.viewCart);


// @DELETE /products/cart/:id/delete
productsRouter.delete('/cart/:productId/delete', productsController.productCartDestroy);


// @GET /products/cart/:id/delete
productsRouter.put('/cart/:id/update', productsController.productCartUpdate);









module.exports = productsRouter;