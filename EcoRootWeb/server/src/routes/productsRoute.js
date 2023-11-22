const express = require('express');
const productsRouter = express.Router();
const productsController = require('../controllers/productsController');
const { productCreateValidations } = require('../validations/validateProductCreate');
const productEditValidations = require('../validations/validateProductEdit');
const upload = require('../middlewares/multerProducts'); // Importa el multer de usuario
const authFileMiddleware = require('../middlewares/authFileMiddleware'); // Importa el multer de usuario
const authSessionMiddleware = require('../middlewares/authSessionmiddleware'); // Importa el multer de usuario




//@--POSTS-----


productsRouter.post('/product/create', [upload.single('image'), authFileMiddleware , productCreateValidations ], productsController.postProductCreate);


//@--GETS--------


productsRouter.get('/products', productsController.getAllproducts);

// @GET /products/id/detail
productsRouter.get('/product/detail/:id', productsController.getProductDetail);

// @GET /product/image/:id
productsRouter.get('/product/image/:id', productsController.getImage);

// @GET /product/categories/:category_id
productsRouter.get('/product/categories/:category_id', productsController.getProductCategory);

// @GET /product/search
productsRouter.get('/product/search', productsController.getSearchProduct);

// @GET /product/getEdit/:id
productsRouter.get('/product/getEdit/:id', productsController.getEditProduct);

// @GET /product/create
productsRouter.get('/product/create',authSessionMiddleware ,productsController.getProductCreate);


//@--DELETES-------


// @DELETE /product/delete/:id
productsRouter.delete('/product/delete/:id', productsController.productDestroy);


//@--PUTS--------

// @PUT /product/edit/:id
productsRouter.put('/product/edit/:id',  [ productEditValidations.productEditValidations ], productsController.putProductEdit);



module.exports = productsRouter;