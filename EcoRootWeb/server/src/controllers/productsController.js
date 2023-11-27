const {
    validationResult
} = require('express-validator');
const fs = require('fs');
const path = require('path');
const db = require('../database/models'); // Asegúrate de que la ruta sea correcta
const {
    Op
} = require('sequelize');
const { log } = require('console');

let formDataOld = {};

const productsController = {


    //@-GETS-------

    getAllproducts: async (req, res) => {

        try {

            const itemsPage = 10;

            // Obtener el número de página desde la consulta (por ejemplo, /api/products?page=2)
            const page = req.query.page ? parseInt(req.query.page) : 1;

            // Calcular el offset
            const offset = (page - 1) * itemsPage;

            const products = await db.Product.findAll({
                include: ['productCategory', 'productBrand'],
                raw: true,
                nest: true,
                limit: itemsPage,
                offset: offset
            });

            const category = await db.Category.findAll({
                include: 'quantityProducts',
                raw: true,
                nest: true,
            });


            if (products.length === 0 || !products) {
                return res.status(404).json({
                    error: 'No se encontraron productos'
                });
            }


            const modifiedProducts = products.map((product) => ({
                product_id: product.product_id,
                name: product.name,
                description: product.description,
                price: product.price,
                united: product.united,
                avatar: product.avatar,
                discount: product.discount,
                material: product.material,
                state: product.state,
                image: `/api/product/image/${product.product_id}`,
                color_id: product.color_id,
                user_id: product.user_id,
                productCategory: {
                    category_id: product.productCategory.category_id,
                    category_name: product.productCategory.category_name
                },
                productBrand: {
                    brand_id: product.productBrand.brand_id,
                    brand_name: product.productBrand.brand_name,
                },
                detail: `/api/product/detail/${product.product_id}`
            }));

            const endPointsProducts = {
                createProduct: "/api/product/create",
                searchProducts: "/api/product/search?query=bambú"
            };

            const countByCategory = category.map((category) => {
                return {
                    name: category.category_name,
                    quantity_products: category.quantityProducts.quantity,
                    productsByCategory: `/api/product/categories/${category.category_id}`,
                    category_id: category.quantityProducts.category_id
                };
            });

            // Calcular las URLs para la paginación
            const nextUrl = products.length === itemsPage ? `/api/products?page=${page + 1}` : null;

            const prevUrl = page > 1 ? `/api/products?page=${page - 1}` : null;
            


            res.status(200).json({
                count: products.length,
                countByCategory,
                endPointsProducts,
                products: modifiedProducts,
                nextUrl,
                previous: prevUrl
            });

        } catch (error) {
            res.status(500).json({
                error: 'Error interno del servidor'
            });
        };


    },

    getProductDetail: async (req, res) => {

        const idProduct = Number(req.params.id);

        if (isNaN(idProduct)) {
            res.status(400).json({
                error: 'ID de producto no válido'
            });
            return;
        };

        try {
            const product = await db.Product.findByPk(idProduct, {
                include: ['productCategory', 'colors', 'productBrand'],
                nest: true,
                raw: true,
            });


            const endPointsProduct = {
                getViewEdit: `/api/product/getEdit/${idProduct}`,
                editProduct: `/api/product/edit/${idProduct}`,
                deleteProduct: `/api/product/delete/${idProduct}`
            };

            const ImageUrl = `/api/product/image/${product.product_id}`;

            const productDetail = {
                product_id: product.product_id,
                name: product.name,
                description: product.description,
                price: product.price,
                united: product.united,
                discount: product.discount,
                material: product.material,
                state: product.state,
                category_name: product.productCategory.category_name,
                productBrand: product.productBrand.brand_name,
                colors: {
                    color_name: product.colors.color_name,
                    hex_code: product.colors.hex_code
                },
                image: ImageUrl,
                
            }


            if (product) {
                res.status(200).json({
                    endPointsProduct,
                    product: productDetail,
                });
            } else {
                res.status(404).json({
                    error: 'No se encontro el producto'
                });
            };

        } catch (error) {
            res.status(500).json({
                error: 'Error interno del servidor'
            });
        };

    },

    getImage: async (req, res) => {


        try {
            const product = await db.Product.findOne({
                where: {
                    product_id: req.params.id
                },
                raw: true
            });

            if (!product.image) {
                return res.status(404).json({
                    error: '¡Imagen no encontrada!'
                });
            };

            const imagePath = path.join(__dirname, '..', '..', '/public/img/products', product.image);

            fs.readFile(imagePath, (err, data) => {
                if (err) {
                    console.error(err);
                    return res.status(404).json({
                        error: 'La imagen no existe'
                    });
                };

                res.writeHead(200, {
                    'Content-Type': 'image/jpeg'
                });
                res.end(data, 'binary');

            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'Error en la ejecución del servidor'
            });
        };
    },

    getEditProduct: async (req, res) => {
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


            const productEdit = {
                product_id: product.product_id,
                brand_id: product.brand_id,
                category_id: product.category_id,
                color_id: product.color_id,
                description: product.description,
                discount: product.discount,
                image: `/api/product/image/${product.product_id}`,
                material: product.material,
                name: product.name,
                price: product.price,
                productBrand: product.productBrand,
                productCategory: product.productBrand,
                productColors: product.productColors,
                state: product.state,
                united: product.united,
                user_id: product.user_id
              };

            res.json({
                product: productEdit,
                category,
                brands,
                colors
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },

    getProductCreate: async (req, res) => {

        try {
            const category = await db.Category.findAll({
              raw: true
            });

            if (!category) {
                res.status(404).json({error: 'Hubo un error al traer las categorias'});
            };
        
            const brands = await db.Brand.findAll({
              raw: true
            });

            if (!brands) {
                res.status(404).json({error: 'Hubo un error al traer las marcas'});
            };
        
            const colors = await db.Color.findAll({
              raw: true
            });

            if (!colors) {
                res.status(404).json({error: 'Hubo un error al traer los colores'});
            };
        
            res.json({
              category,
              brands,
              colors
            });
          } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
          }
    },

    getProductCategory: async (req, res) => {

        try {

            const categoryId = req.params.category_id;

            const categoryById = await db.Category.findByPk(categoryId, {
                raw: true
            });

            console.log(categoryById);

            const productsCategory = await db.Product.findAll({
                where: {
                    category_id: categoryId
                },
                include: ['productCategory', 'productBrand'],
                nest: true,
                raw: true
            });

            const products = productsCategory.map((data) => ({
                product_id: data.product_id,
                name: data.name,
                description: data.description,
                price: data.price,
                united: data.united,
                discount: data.discount,
                state: data.state,
                user_id: data.user_id,
                discount: data.discount,
                category_name: data.productCategory.category_name,
                brand_name: data.productBrand.brand_name,
                image: `/api/product/image/${data.product_id}`

            }));


            res.json({
                categoryName: categoryById.category_name,
                count: productsCategory.length,
                productsByCategory: products,
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'Internal Server Error'
            });
        }
    },

    getSearchProduct: async (req, res) => {

        const search = req.query.query;

        try {
            if (!search) {
                // Si no se proporciona un término de búsqueda, devuelve un mensaje de error
                return res.status(400).json({
                    error: 'Debe proporcionar un término de búsqueda'
                });
            }

            const results = await db.Product.findAll({
                raw: true,
                include: 'productCategory',
                nest: true,
                where: {
                    name: {
                        [Op.like]: `%${search}%`
                    }
                }
            });


            const productsBySearch = results.map((product) => ({

                product_id: product.product_id,
                name: product.name,
                description: product.description,
                price: product.price,
                united: product.united,
                avatar: product.avatar,
                discount: product.discount,
                material: product.material,
                state: product.state,
                image: `/api/product/image/${product.product_id}`,
                color_id: product.color_id,
                user_id: product.user_id,
                productCategory: {
                    category_id: product.productCategory.category_id,
                    category_name: product.productCategory.category_name
                },
            }))

            res.status(200).json({
                products: productsBySearch
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'Internal Server Error'
            });
        }

    },





    //@--POSTS-----


    postProductCreate: async (req, res) => {


        try {

            const result = validationResult(req);


            // Verifica si req.file está definido (si se ha cargado un archivo)
            if (req.file) {
                // Si hay errores de validación, elimina el archivo y muestra los errores;
                if (result.errors.length > 0) {
                    fs.unlinkSync(path.join(__dirname, '../../public/img/products/' + req.file.filename));
                    const errors = result.errors.map(err => ({
                        [err.path]: err.msg
                    }));
                    return res.status(400).json({
                        errors
                    });
                }
                // Si no hay errores de validación, procede con la creación del producto y otras acciones;
            } else {
                // Si no se cargó un archivo, muestra los errores de validación sin intentar eliminar un archivo;
                if (result.errors.length > 0) {
                    const errors = result.errors.map(err => ({
                        [err.path]: err.msg
                    }));
                    return res.status(400).json({
                        errors
                    });
                }
            }

            console.log('session', req.session);

            const newProduct = {
                name: req.body.name,
                description: req.body.description,
                price: Number(req.body.price),
                united: Number(req.body.united),
                discount: Number(req.body.discount),
                material: req.body.material,
                user_id: req.body.user_id,
                state: req.body.state,
                image: req.file.filename,
                color_id: req.body.color,
                category_id: req.body.category,
                brand_id: req.body.brand,
            };

            //Creacion Product
            const productNew = await db.Product.create(newProduct);

            if (productNew.length === 0) {
                return res.status(404).json({
                    success: false,
                    error: 'Fallo la creación del producto'
                });
            };


            const [quantityProduct, created] = await db.QuantityProductCategory.findOrCreate({
                where: {
                    category_id: newProduct.category_id
                },
                defaults: {
                    quantity: 1
                }
            });

            if (!created) {
                // Si no fue creado, ya existe, entonces incrementamos la cantidad
                quantityProduct.quantity += 1;
                await quantityProduct.save();
            }



            //Ingreso de datos tabla intermedia ProductColor
            const colorsProduct = Array.isArray(req.body.color) ? req.body.color : [req.body.color];
            colorsProduct.forEach(async (colorId) => {
                await db.ProductColor.create({
                    product_id: productNew.product_id,
                    color_id: colorId,
                });
            });


            return res.status(201).json({
                success: true,
                message: '¡Producto creado exitosamente!',
                redirect: '/products'
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({
                error: 'Internal Server Error'
            });
        }
    },



    //@--PUTS--------


    putProductEdit: async (req, res) => {

        const result = validationResult(req);


        if (req.file) {
            // Si hay errores de validación, elimina el archivo y muestra los errores
            if (result.errors.length > 0) {
                fs.unlinkSync(path.join(__dirname, '../../public/img/products/' + req.file.filename));
                const errors = result.errors.map(err => ({
                    [err.path]: err.msg
                }));
                return res.status(400).json({
                    errors
                });
            }

            // Si no hay errores de validación, procede con la creación del producto y otras acciones

        } else {
            // Si no se cargó un archivo, muestra los errores de validación sin intentar eliminar un archivo
            if (result.errors.length > 0) {
                const errors = result.errors.map(err => ({
                    [err.path]: err.msg
                }));
                return res.status(400).json({
                    errors
                });
            };
        };

        try {

            const idProduct = req.params.id;

            const product = await db.Product.findByPk(idProduct, {
                raw: true,
            });


            if (!product || product.length === 0) {
                return res.status(404).json({
                    error: 'No se encontraron algunos datos'
                });
            };

            const productEdit = {
                product_id: Number(req.params.id),
                name: req.body.name,
                description: req.body.description,
                price: Number(req.body.price),
                united: Number(req.body.united),
                discount: Number(req.body.discount),
                material: req.body.material,
                user_id: product.user_id,
                state: req.body.state,
                image: req.file ? req.file.filename : product.image, // Si no se manda ninguna imagen nueva se mantiene la misma
                color_id: req.body.color,
                category_id: req.body.category,
                brand_id: req.body.brand,
            };


            const updateProduct = await db.Product.update(productEdit, {
                where: {
                    product_id: Number(req.params.id)
                }
            });

            if (updateProduct.length === 0 || !updateProduct) {
                return res.status(404).json({
                    success: false,
                    error: 'Fallo la actualización del producto'
                });
            }

            res.status(200).json({
                success: true,
                message: 'Product updated successfully',
                redirect: `/products/${productEdit.product_id}/detail`
            });


        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'Internal server error'
            });
        }



    },




    //@--DELETES-------

    productDestroy: async (req, res) => {

        try {

            const idProduct = Number(req.params.id);

            const product = await db.Product.findByPk(idProduct);

            if (product.length === 0 || !product) {
                return res.status(404).json({
                    error: 'Producto no encontrado'
                });
            };

            // Obtener la cantidad actual del producto en quantity_productcategory
            const quantityProductCategory = await db.QuantityProductCategory.findByPk(product.category_id);

            console.log(quantityProductCategory);

            if (!quantityProductCategory) {
                return res.status(404).json({
                    error: 'Hubo un error al eliminar el producto'
                });
            }

            // Decrementar la cantidad y actualizar o eliminar según corresponda
            if (quantityProductCategory.quantity > 1) {
                await db.QuantityProductCategory.update({
                    quantity: quantityProductCategory.quantity - 1
                }, {
                    where: {
                        category_id: product.category_id
                    }
                });
            } else {
                await db.QuantityProductCategory.destroy({
                    where: {
                        category_id: product.category_id
                    }
                });
            }

            const productDestroy = await db.Product.destroy({
                where: {
                    product_id: Number(req.params.id)
                }
            });

            if (!productDestroy) {
                return res.status(404).json({
                    error: 'Hubo un error al eliminar el producto'
                });
            }

            fs.unlinkSync(path.join(__dirname, '../../public/img/products/' + product.image));

            res.status(200).json({
                success: true,
                message: 'Producto eliminado exitosamente',
                redirect: '/api/products'
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({
                error: 'Error interno del servidor'
            });
        };

    },


};


module.exports = productsController;