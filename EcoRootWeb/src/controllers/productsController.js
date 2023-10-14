const { validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');
const db = require('../database/models');
let formDataOld = {};
const { Op } = require('sequelize');
const { log } = require('console');
const { raw } = require('mysql2');


const productsController = {

    //PRIMER EDICION SEQUELIZE

    products: async (req, res) => {

        try {

            const products = await db.Product.findAll({
                include: 'productCategory',
                raw: true,
                nest: true
            });


            res.render('products', {
                products: products
            });

        } catch (error) {
            console.error(error);
        };


    },


    productDetail: async (req, res) => {


        try {
            const product = await db.Product.findByPk(Number(req.params.id), {
                include: ['productCategory', 'colors', 'productBrand'],
                nest: true,
                raw: true,
            });

            res.render('productDetail', {
                product
            });

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


            res.render('productCreate', {
                errors: req.query,
                formDataOld,
                category,
                brands,
                colors
            });

            console.log(req.query);

        } catch (error) {
            console.error(error);
        }


    },


    postProductCreate: async (req, res) => {

        formDataOld = req.body || {};

        const result = validationResult(req);


        // Verifica si req.file está definido (si se ha cargado un archivo)
        if (req.file) {
            // Si hay errores de validación, elimina el archivo y muestra los errores
            if (result.errors.length > 0) {
                fs.unlinkSync(path.join(__dirname, '../../public/img/products/' + req.file.filename));

                const queryArray = result.errors.map(errors => "&" + errors.path + "=" + errors.msg);
                const queryErrors = queryArray.join('');
                res.redirect('/products/create?admin=true' + queryErrors);
                return;
            }

            // Si no hay errores de validación, procede con la creación del producto y otras acciones
            // ...

        } else {
            // Si no se cargó un archivo, muestra los errores de validación sin intentar eliminar un archivo
            if (result.errors.length > 0) {
                const queryArray = result.errors.map(errors => "&" + errors.path + "=" + errors.msg);
                const queryErrors = queryArray.join('');
                res.redirect('/products/create?admin=true' + queryErrors);

                return;
            }
        }

        const newProduct = {
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            united: Number(req.body.united),
            discount: Number(req.body.discount),
            material: req.body.material,
            user_id: req.session.user.user_id,
            state: req.body.state,
            image: req.file.filename,
            color_id: req.body.color,
            category_id: req.body.category,
            brand_id: req.body.brand,
        };

        try {
            //Creacion Product
            const productNew = await db.Product.create(newProduct);


            //Ingreso de datos tabla intermedia ProductColor
            const colorsProduct = Array.isArray(req.body.color) ? req.body.color : [req.body.color];
            colorsProduct.forEach(async (colorId) => {
                await db.ProductColor.create({
                    product_id: productNew.product_id,
                    color_id: colorId,
                });
            });

            //Ingreso de datos tabla intermedia BrandCategory
            // Obtener los 'brand_id' y 'category_id' desde req.body (pueden ser múltiples)
            const brandIds = Array.isArray(req.body.brand) ? req.body.brand : [req.body.brand];
            const categoryIds = Array.isArray(req.body.category) ? req.body.category : [req.body.category];

            // Crear registros en la tabla 'brandCategory' para relacionar las marcas y categorías seleccionadas
            for (const brandId of brandIds) {
                for (const categoryId of categoryIds) {
                    await db.BrandCategory.create({
                        brand_id: brandId,
                        category_id: categoryId,
                    });
                }
            };



        } catch (error) {
            console.error(error);
        }

        res.redirect('/products');

    },

    productDestroy: async (req, res) => {


        const productId = await db.Product.findByPk(Number(req.params.id));

        try {
            await db.Product.destroy({
                where: {
                    product_id: Number(req.params.id)
                }
            });

        } catch (error) {
            console.error(error);
        }

        fs.unlinkSync(path.join(__dirname, '../../public/img/products/' + productId.image));

        res.redirect('/products');

    },


    getEdit: async (req, res) => {


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

            const product = await db.Product.findByPk(Number(req.params.id), {
                include: ['productCategory', 'productColors', 'productBrand'],
                nest: true,
                raw: true,
            });

            res.render('productEdit', {
                product,
                category,
                brands,
                colors
            });

        } catch (error) {
            console.error(error);
        };

    },


    //PUT


    putProductEdit: async (req, res) => {


        try {
            const product = await db.Product.findByPk(Number(req.params.id), {
                raw: true
            });


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
                image: req.file ? req.file.filename : product.image, // Si no se manda ninguna imagen nueva se mantiene la misma
                color_id: Number(req.body.color),
                category_id: Number(req.body.category),
                brand_id: Number(req.body.brand),
            };


            await db.Product.update(productEdit, {
                where: {
                    product_id: Number(req.params.id)
                }
            })

            res.redirect('/products/' + productEdit.product_id + '/detail');


        } catch (error) {
            console.error(error);
        }



    },

    getproductCategory: async (req, res) => {

        try {

            const categories = await db.Category.findAll({
                raw: true
            });
            const category = await db.Category.findByPk(req.params.category_id, {
                raw: true
            });
            const productsCategory = await db.Product.findAll({
                where: {
                    category_id: req.params.category_id
                },
                include: ['productCategory', 'productBrand'],
                nest: true,
                raw: true
            });

            res.render('productCategory', {
                products: productsCategory,
                categories,
                categoryName: category.category_name
            });

        } catch (error) {
            console.error(error);
        }
    },

    getSearchProduct: async (req, res) => {

        const search = req.query.search;


        try {
            const results = await db.Product.findAll({
                raw: true,
                include: 'productCategory',
                nest: true,
                where: {
                    name: {
                        [Op.like]: `%${search}%`
                    }
                }
            })

            res.render('productResult', {
                products: results
            });

        } catch (error) {
            console.error(error);
        }

    },

    addToCart: async (req, res) => {

        
        try {
            const userId = req.session.user.user_id; // Reemplaza con la forma en que obtienes el ID del usuario
            const productId = req.body.product_id; // Supongamos que se envía en el cuerpo de la solicitud
            const quantity = req.body.quantity || 1;

            const cart = await db.Cart.findOne({ where: { user_id: userId }, raw: true });

            if (!cart) {
                // Si el usuario no tiene un carrito, crea uno
                const newCart = await db.Cart.create({ user_id: userId });
                const cartId = newCart.cart_id;
                
                // Luego, crea un registro en ProductCart para el producto
                await db.ProductCart.create({ cart_id: cartId, product_id: productId, quantity: quantity });
              } else {
                // Si el usuario ya tiene un carrito, verifica si el producto ya está en el carrito
                const existingProduct = await db.ProductCart.findOne({ where: { cart_id: cart.cart_id, product_id: productId } });
          
                if (existingProduct) {
                  // Si el producto ya está en el carrito, actualiza la cantidad
                  existingProduct.quantity = quantity;
                  await existingProduct.save();
                } else {
                  // Si el producto no está en el carrito, crea un nuevo registro
                  await db.ProductCart.create({ cart_id: cart.cart_id, product_id: productId, quantity: quantity });
                }
              };

              res.redirect('/products');

        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
        }

    },

    viewCart: async (req, res) => {

        try {
            // Obtener el ID del usuario que ha iniciado sesión (ajusta según tu sistema de autenticación)
            const userId = req.session.user.user_id; 
        
            // Buscar el carrito del usuario actual
            const cart = await db.Cart.findOne({ where: { user_id: userId },  include: 'products', raw: true, nest: true });
            

            const cartProducts = await db.Cart.findAll({
                where: { cart_id: cart.cart_id },
                include: 'products',
                raw: true,
                nest: true,
              });


            if (!cart || (cart.products.ProductCart.quantity === null)) {
              // Si el usuario no tiene un carrito, puedes mostrar un mensaje o redirigir a una página vacía de carrito
              return res.render('cartEmpty'); // Crea una vista "empty-cart.ejs" para mostrar el carrito vacío
            }
        

            
            res.render('productCart', { cartProducts: cartProducts });


           /* res.send('cart'); */

          } catch (error) {

            console.error('Error al ver el carrito:', error);

          }

    },

    productCartDestroy: async (req, res) => {

        try {
            const productId = req.params.productId;
            const userId = req.session.user.user_id;

            
            // Buscar el carrito del usuario
            const cart = await db.Cart.findOne({ where: { user_id: userId }, raw: true });
            
            // Eliminar el producto del carrito
            await db.ProductCart.destroy({
                where: { cart_id: cart.cart_id, product_id: productId }
            });
            
            res.redirect('/products/cart');

          } catch (error) {
            
            console.error('Error al eliminar el producto del carrito:', error);
          }
        
    },

    productCartUpdate: async (req, res) => {
        try {
            const productId = req.params.id;
            const userId = req.session.user.user_id;
            const action = req.query.action; // Puede ser 'increase' o 'decrease'
            
            
            // Buscar el carrito del usuario
            const cart = await db.Cart.findOne({ where: { user_id: userId }, raw: true });
            
            // Buscar el producto en el carrito

            const productInCart = await db.ProductCart.findOne({ where: { cart_id: cart.cart_id, product_id: productId },
                 raw: true });

            
            if (!cart) {
              return res.status(404).send('El producto no se encuentra en el carrito.');
            }
            
            const updateData = {};

            if (action === 'increase') {
                updateData.quantity = productInCart.quantity + 1;
                
            } else if (action === 'decrease' && productInCart.quantity > 1) {
                updateData.quantity = productInCart.quantity - 1;
            }

            
            await db.ProductCart.update(updateData, {
                where: { product_cart_id: productInCart.product_cart_id }
            });
            
              
                
            res.redirect('/products/cart');
        
          } catch (error) {
            console.error('Error al actualizar la cantidad del producto en el carrito:', error);
          }
    }
};


module.exports = productsController;