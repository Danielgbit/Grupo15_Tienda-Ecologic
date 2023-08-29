const express = require('express');
const productsRouter = express.Router();
const productsController = require('../controllers/productsController');
const path = require('path');
const multer = require('multer');
const { productCreateValidations } = require('../middlewares/validationMiddlewares');


//MULTER --

const storage = multer.diskStorage ({
    destination: (req, file, cb) => {
        cb(null, './public/img/products');
    },
    filename: (req, file, cb) => {

        const newFileName = 'img-product' + '-' + Date.now() + path.extname(file.originalname);

        cb(null, newFileName);
    }
});

const upload = multer({ storage });

// ----



// @GET /products
productsRouter.get('/', productsController.products);

productsRouter.post('/', [upload.single('image'), ...productCreateValidations]  , productsController.postProductCreate);


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

// @PUT /products/:id/detail
productsRouter.put('/:id/detail', productsController.putProductEdit);








module.exports = productsRouter;