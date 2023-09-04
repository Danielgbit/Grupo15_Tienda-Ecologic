const models = require('../models/productsModels');
const modelProducts = require('../models/productsModels');
const { validationResult } = require('express-validator');

const products = modelProducts.findAll();
let formDataOld = {};

const productsController = {
    

    products: (req, res) => {

        res.render('products', {products: products})
    },


    productDetail: (req, res) => {

        const productId = modelProducts.findById(Number(req.params.id));

        res.render('productDetail', {product: productId});
    },

    //@CREATE


    getproductCreate: (req, res) => {


        res.render('productCreate', { errors: req.query, formDataOld });

    },


    postProductCreate: (req, res) => {

        formDataOld = req.body || {};

        const result = validationResult(req);

        if (result.errors.length > 0) {

            const queryArray = result.errors.map(errors => "&" + errors.path + "=" + errors.msg)

            const queryErrors = queryArray.join('')

            res.redirect('/products/create?admin=true' + queryErrors);
            

            return;
        }
        
        const lastProduct = products[products.length - 1].id;


        const newProduct = {
            id: lastProduct + 1,
            name: req.body.name,
            brand: req.body.brand,
            united: Number(req.body.united),
            category: req.body.category,
            material: req.body.material,
            state: req.body.state,
            image: req.file.filename,
            description: req.body.description,
            color: req.body.color,
            discount: Number(req.body.discount),
            price: Number(req.body.price),
        };

        models.createProduct(newProduct);

        res.redirect('/products');
    
    },

    productDestroy: (req, res) => {

        let newArrayProducts = products.filter((products) => products.id !== Number(req.params.id));

        models.destroyProduct(newArrayProducts);

        res.redirect('/products');

    },

    
    getEdit: (req, res) => {
        
        const productId = models.findById(Number(req.params.id));
        
        res.render('productEdit', {product: productId});
    },
    
    
    //PUT
    

    putProductEdit: (req, res) => {


        
        const productEdit = {
            id: Number(req.params.id),
            name: req.body.name,
            brand: req.body.brand,
            united: Number(req.body.united),
            category: req.body.category,
            material: req.body.material,
            state: req.body.state,
            image: req.body.image,
            description: req.body.description,
            color: req.body.color,
            discount: Number(req.body.discount),
            price: Number(req.body.price),
        }

        if(productEdit.image == "") {
            productEdit.image = "img-product-1691864692162.jpg"
        };
        
      
        models.editProduct(productEdit);

        res.redirect('/products/'+ productEdit.id +'/detail');
    }
}


module.exports = productsController;