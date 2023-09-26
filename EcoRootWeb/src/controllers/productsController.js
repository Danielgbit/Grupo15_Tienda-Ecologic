const models = require('../models/productsModels');
const modelProducts = require('../models/productsModels');
const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const products = modelProducts.findAll();
const db = require('../database/models');
let formDataOld = {};


const productsController = {
    
    //PRIMER EDICION SEQUELIZE

    products: async (req, res) => {

        try {
            const products = await  db.Product.findAll({
                raw: true,
            });

            console.log(products);

        } catch (error) {
            console.error(error);
        };

        res.send('Estas viendo todos los productos');

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

            fs.unlinkSync(path.join(__dirname, '../../public/img/products/' + req.file.filename));


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

        const productId = models.findById(Number(req.params.id));

        fs.unlinkSync(path.join(__dirname, '../../public/img/products/' + productId.image));

        models.destroyProduct(newArrayProducts);

        res.redirect('/products');

    },

    
    getEdit: (req, res) => {
        

        const productId = models.findById(Number(req.params.id));
        
        res.render('productEdit', {product: productId});
    },
    
    
    //PUT
    

    putProductEdit: (req, res) => {


        const products = modelProducts.findById(Number(req.params.id));

        const productEdit = {
            id: Number(req.params.id),
            name: req.body.name,
            brand: req.body.brand,
            united: Number(req.body.united),
            category: req.body.category,
            material: req.body.material,
            state: req.body.state,
            image:  req.file ? req.file.filename : products.image, // Si no se manda ninguna imagen nueva se mantiene la misma
            description: req.body.description,
            color: req.body.color,
            discount: Number(req.body.discount),
            price: Number(req.body.price),
        }

        
      
        models.editProduct(productEdit);

        res.redirect('/products/'+ productEdit.id +'/detail');
    }
}


module.exports = productsController;