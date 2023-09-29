const {
    validationResult
} = require('express-validator');
const fs = require('fs');
const path = require('path');
const db = require('../database/models');
let formDataOld = {};


const productsController = {

    //PRIMER EDICION SEQUELIZE

    products: async (req, res) => {

        try {

            const products = await db.Product.findAll({ include: 'productCategory', raw: true, nest: true });

            res.render('products', { products: products });

        } catch (error) {
            console.error(error);
        };


    },


    productDetail: async (req, res) => {


        try {
            const product = await db.Product.findByPk(Number(req.params.id), { include: ['productCategory', 'colorProduct', 'productBrand' ], 
            nest: true,  raw: true , });
            
            res.render('productDetail', { product });
            
        } catch (error) {
            console.error(error);
        }

    },

    //@CREATE


    getproductCreate: async (req, res) => {

        try {

            const category = await db.Category.findAll({
                raw: true
            });

            const brands = await db.Brand.findAll({
                raw: true
            });

            const colors = await db.Color.findAll({
                raw: true
            });



            res.render('productCreate', { errors: req.query, formDataOld, category, brands, colors });

        } catch (error) {
            console.error(error);
        }


    },


    postProductCreate: async (req, res) => {

        formDataOld = req.body || {};

        const result = validationResult(req);



        if (result.errors.length > 0) {

            fs.unlinkSync(path.join(__dirname, '../../public/img/products/' + req.file.filename));


            const queryArray = result.errors.map(errors => "&" + errors.path + "=" + errors.msg)

            const queryErrors = queryArray.join('')

            res.redirect('/products/create?admin=true' + queryErrors);


            return;
        }

        const newProduct = {
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            united: Number(req.body.united),
            discount: Number(req.body.discount),
            material: req.body.material,
            user_id: req.session.user.id,
            state: req.body.state,
            image: req.file.filename,
            color_id: req.body.color,
            category_id: req.body.category,
            brand_id: req.body.brand,
        };

        try {
            await db.Product.create(newProduct);

        } catch (error) {
            console.error(error);
        }

        res.redirect('/products');

    },

    productDestroy: (req, res) => {

        let newArrayProducts = products.filter((products) => products.id !== Number(req.params.id));

        const productId = models.findById(Number(req.params.id));

        fs.unlinkSync(path.join(__dirname, '../../public/img/products/' + productId.image));

        models.destroyProduct(newArrayProducts);

        res.redirect('/products');

    },


    getEdit: async (req, res) => {
        
        const category = await db.Category.findAll({
            raw: true
        });

        const brands = await db.Brand.findAll({
            raw: true
        });

        const colors = await db.Color.findAll({
            raw: true
        });

        const product = await db.Product.findByPk(Number(req.params.id), { include: ['productCategory', 'colorProduct', 'productBrand' ], 
        nest: true,  raw: true , });

        res.render('productEdit', { product, category , brands, colors  });
    },


    //PUT


    putProductEdit: async (req, res) => {

        
        const productEdit = {
            product_id: Number(req.params.id),
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            united: Number(req.body.united),
            discount: Number(req.body.discount),
            material: req.body.material,
            user_id: req.session.user.id,
            state: req.body.state,
            image: req.file ? req.file.filename : products.image, // Si no se manda ninguna imagen nueva se mantiene la misma
            color_id: req.body.color,
            category_id: req.body.category,
            brand_id: req.body.brand,
        };
        
        console.log(productEdit);
        try {

           /*  const update = await db.Product.update(productEdit); */
          /*  res.redirect('/products/' + productEdit.product_id + '/detail'); */

          res.send('actualizado')

            
        } catch (error) {
            console.error(error);
        }
        
    

    }
};


module.exports = productsController;