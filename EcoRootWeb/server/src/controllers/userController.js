const uuid = require('uuid');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const db = require('../database/models');

let dataOld = {};
let dataOldRegister = {};


const userController = {


    //@-POSTS-------

    postLoginProcess: async (req, res) => {
        
        const result = validationResult(req);

        //Express validator
        if (result.errors.length > 0) {
            const errors = result.errors.map(err => ({ [err.path]: err.msg }));
            return res.status(400).json({ errors });
        };

        const userinUse = await db.User.findOne({ where: { email: req.body.email, }, raw: true });
        
        if (!userinUse) {
            return res.json({ error:{ 
                email:'el email es incorrecto' 
            }
        });
    };


        const validPassword = bcrypt.compareSync(req.body.password, userinUse.password);

        if (!validPassword) {
            return res.json({ error: { password: 'la contraseña no coincide' } });
        };

        //@COOKIES

        if (userinUse) {

            const unaSemanaEnSegundos = 7 * 24 * 60 * 60;
            const maxAge = unaSemanaEnSegundos * 1000; // duracion una semana;

            res.cookie('uEmail', userinUse, {
                maxAge,
                secure: true, // Solo enviar la cookie a través de HTTPS
                httpOnly: true,
            });

        };

        const sessionCookie = req.cookies['connect.sid']; // Cambia 'connect.sid' según el nombre de tu cookie de sesión

        // Loguea o haz lo que necesites con la cookie
        console.log('Valor de la cookie de sesión:', sessionCookie);


        console.log('userinUse', userinUse);



        if (userinUse) {
            req.session.user = userinUse;
            console.log('req.session.user', req.session.user);
            return res.status(200).json({ success: true, message: 'Login successful' });
        };

    },

    postRegisterUser: async (req, res) => {
        //Resultado de validaciones
        const result = validationResult(req);

        //Manejo de errores
        if (req.file) {
            if (result.errors.length > 0) {
                fs.unlinkSync(path.join(__dirname, '../../public/img/avatars/' + req.file.filename));
                const errors = result.errors.map(err => ({ [err.path]: err.msg }));
                return res.status(400).json({ errors });
            };
        } else {
            if (result.errors.length > 0) {
                const errors = result.errors.map(err => ({ [err.path]: err.msg }));
                return res.status(400).json({ errors });
            };
        };


        const newUser = {
            user_id: uuid.v4(),
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar: req.file.filename,
            country: req.body.country,
            city: req.body.city,
            address: req.body.address,
            birthDate: req.body.birthDate,
            gender: req.body.gender,
        };

        try {

            const userinUse = await db.User.findOne({
                where: {
                    email: req.body.email
                },
                raw: true
            });

            if (userinUse) {
                return res.status(400).json({
                    error: { email: 'El email ya está en uso' }
                    
                });
            };

            newUser.password = bcrypt.hashSync(newUser.password, 10);
            const userCreate = await db.User.create(newUser, {raw: true, nest: true});
            
            delete userCreate.dataValues.password; // Eliminamos la propiedad password para no enviarla a la vista;

            if (userCreate.length === 0) {
                res.status(400).json({  
                    success: false,
                    message: 'No se creo el usuario'
                 });
                 fs.unlinkSync(path.join(__dirname, '../../public/img/avatars/' + req.file.filename));
                 return;
            };


            return res.status(200).json({
                success: true,
                message: 'Usuario registrado exitosamente',
                newUser: userCreate
            });

        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Error interno del servidor' });
        };

    },

    postUserLogout: (req, res) => {

        try {
            res.clearCookie('uEmail');
            req.session.destroy();
    
            res.status(200).json({
                success: true,
                message: 'Cierre de sesión exitoso'
            });
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
            res.status(500).json({
                success: false,
                message: 'Error al cerrar sesión'
            });
        }

    },

    postCreateOrder: async (req, res) => {
        try {
            const userId = req.params.id;

            // Si no hay una orden en curso, procede a crear una nueva orden
            const orderDate = new Date(); // Fecha de la orden (puedes personalizarla según tus necesidades)

            const cart = await db.Cart.findOne({
                where: {
                    user_id: userId
                }
            });
            // Consulta para obtener los productos del carrito desde la tabla 'CartProduct'
            const cartProducts = await db.ProductCart.findAll({
                where: {
                    cart_id: cart.cart_id,
                },
                raw: true,
            });


            const newOrder = await db.Order.create({
                user_id: userId,
                order_date: orderDate
            }, {
                raw: true
            });

            cartProducts.forEach(async (product) => {
                await db.OrderProduct.create({
                    order_id: newOrder.order_id,
                    product_id: product.product_id,
                    quantity: product.quantity,
                });
            });

            res.status(200).json({
                success: true,
                message: 'Orden creada exitosamente'
              });



        } catch (error) {
            console.error('Error al crear la orden:', error);
            res.status(500).json({
                success: false,
                message: 'Error al crear la orden'
            });
        }

    },

    postCreateProductCart: async (req, res) => {

        try {
            const userId = req.params.id; // Reemplaza con la forma en que obtienes el ID del usuario
            const productId = req.body.product_id; // Supongamos que se envía en el cuerpo de la solicitud
            const quantity = req.body.quantity || 1;

            const cart = await db.Cart.findOne({
                where: {
                    user_id: userId
                },
                raw: true
            });

            if (!cart) {
                // Si el usuario no tiene un carrito, crea uno
                const newCart = await db.Cart.create({
                    user_id: userId
                });

                const cartId = newCart.cart_id;

                // Luego, crea un registro en ProductCart para el producto
                await db.ProductCart.create({
                    cart_id: cartId,
                    product_id: productId,
                    quantity: quantity
                });
            } else {
                // Si el usuario ya tiene un carrito, verifica si el producto ya está en el carrito
                const existingProduct = await db.ProductCart.findOne({
                    where: {
                        cart_id: cart.cart_id,
                        product_id: productId
                    }
                });

                if (existingProduct) {
                    // Si el producto ya está en el carrito, actualiza la cantidad
                    existingProduct.quantity = quantity;
                    await existingProduct.save();
                } else {
                    // Si el producto no está en el carrito, crea un nuevo registro
                    await db.ProductCart.create({
                        cart_id: cart.cart_id,
                        product_id: productId,
                        quantity: quantity
                    });
                }
            };

            res.status(200).json({
                success: true,
                message: 'Producto agregado al carrito exitosamente',
                redirect: '/products'
            });


        } catch (error) {
            console.error('Error al agregar producto al carrito:', error);
            res.status(500).json({
                success: false,
                message: 'Error interno del servidor'
            });
        }
    },

    destroySession: async (req, res) => {

        try {
            // Borra la cookie del cliente
            res.clearCookie('uEmail');
            req.session.destroy();
        
            return res.json({ success: true, message: 'Sesión cerrada exitosamente' });
          } catch (error) {
            console.error('Error al destruir la sesión:', error);
            return res.status(500).json({ success: false, error: 'Error al cerrar la sesión' });
          }
  },


    //@-DELETES----------


    deleteUser: async (req, res) => {


        try {
            const userExisting = await db.User.findByPk(req.params.id, { raw: true });

            if (!userExisting) {
                return res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                  });
            };


            const cart = await db.Cart.findOne({
                where: {
                    user_id: userExisting.user_id
                },
                raw: true
            });

            if (!cart) {
                res.status(404).json({
                    error: 'No se encontro el carrito del user'
                });
            };


            const productInCart = await db.ProductCart.findOne({
                where: {
                    cart_id: cart.cart_id,
                }
            });


            
            if (productInCart) {
                await db.ProductCart.destroy({
                    where: {
                        cart_id: cart.cart_id,
                    }
                });
            }
            await db.Cart.destroy({
                where: {
                    cart_id: cart.cart_id,
                }
            });

            await db.Product.destroy({ where: { user_id: req.params.id } });

            await db.User.destroy({ where: { user_id: req.params.id } });

            fs.unlinkSync(path.join(__dirname, '../../public/img/avatars/' + userExisting.avatar));

            res.clearCookie('uEmail');
            req.session.destroy();

            res.status(200).json({
                success: true,
                message: 'Usuario eliminado exitosamente'
            });

        } catch (error) {
            console.error(`error delete user: ${error}`);
            res.status(500).json({
                success: false,
                message: 'Error al eliminar el usuario'
              });
        };

    },

    deleteProductInCart: async (req, res) => {

        try {

            const productId = req.params.productId;
            const userId = req.body.user_id;


            // Buscar el carrito del usuario
            const cart = await db.Cart.findOne({
                where: {
                    user_id: userId
                },
                raw: true
            });

            const productInCart = await db.ProductCart.findOne({
                where: {
                    cart_id: cart.cart_id,
                    product_id: productId
                }
            });

            // Eliminar el producto del carrito
            if (productInCart) {
                await db.ProductCart.destroy({
                    where: {
                        cart_id: cart.cart_id,
                        product_id: productId
                    }
                });
    
                res.status(200).json({
                    success: true,
                    message: 'Producto eliminado del carrito correctamente' 
                });
            } else {
                res.status(404).json({ message: 'Producto no encontrado en el carrito' });
            };

        } catch (error) {
            console.error('Error al eliminar el producto del carrito:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }

    },


    deleteOrder: async (req, res) => {
        try {
            const orderId = req.params.orderId;
    
            // Utiliza una transacción para garantizar la integridad de la base de datos
            await db.sequelize.transaction(async (t) => {
                // Eliminar OrderProduct asociado a la orden
                await db.OrderProduct.destroy({
                    where: {
                        order_id: orderId
                    },
                    transaction: t
                });
    
                // Eliminar la orden
                const deletedOrderRows = await db.Order.destroy({
                    where: {
                        order_id: orderId
                    },
                    transaction: t
                });
    
                if (deletedOrderRows === 0) {
                    throw new Error('La orden no pudo ser encontrada o ya fue eliminada.');
                }
            });
    
            res.status(200).json({
                success: true,
                message: 'Orden y productos asociados eliminados exitosamente.'
            });
    
        } catch (error) {
            console.error('Error al eliminar la orden:', error);
            res.status(500).json({
                success: false,
                message: 'Error al eliminar la orden y productos asociados.'
            });
        }
    },


    //@-PUTS----------

    putUpdateUser: async (req, res) => {                                                  

        const result = validationResult(req);

        if (result.errors.length > 0) {
            const errors = result.errors.map(err => ({ [err.path]: err.msg }));
            return res.status(400).json({ errors });
        };

        try {

            
            const user = await db.User.findByPk(req.params.id);
            
            let newUser = {
                id: req.params.id,
                email: req.body.email,
                password: req.body.password,
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                country: req.body.country,
                city: req.body.city,
                address: req.body.address,
                birthDate: req.body.birthDate,
                username: req.body.username,
                gender: req.body.gender,
                avatar: req.file ? req.file.filename : user.avatar // Si no se manda ninguna imagen nueva se mantiene la misma
            };
            
            
            if (req.file) {
                fs.unlinkSync(path.join(__dirname, '../../public/img/avatars/' + user.avatar));
            }
            
            newUser.password = bcrypt.hashSync(newUser.password, 10);

            const userUpdated = await db.User.update(newUser, {
                where: {
                    user_id: req.params.id
                }
            });

            if (userUpdated) {
                // Buscar el usuario actualizado después de la actualización
                const updatedUser = await db.User.findByPk(req.params.id, {
                    raw: true
                });

                if (updatedUser) {
                    req.session.user = updatedUser;
                };

            res.status(200).json({
                 success: true,
                 message: 'Usuario actualizado exitosamente'
            });

            }else {
                res.status(404).json({
                    success: false,
                    message: 'Usuario no encontrado'
                });
            }

        } catch (error) {
            console.error(error);
            res.status(500).json({
              success: false,
              message: 'Error al actualizar el usuario'
            });
        };

    },

    putProductInCartUpdate: async (req, res) => {
        try {
            const productId = req.params.id;
            const userId = req.body.user_id || req.session.user.user_id;
            const action = req.body.action; // Puede ser 'increase' o 'decrease'


            // Buscar el carrito del usuario
            const cart = await db.Cart.findOne({
                where: {
                    user_id: userId
                },
                raw: true
            });

            // Buscar el producto en el carrito
            const productInCart = await db.ProductCart.findOne({
                where: {
                    cart_id: cart.cart_id,
                    product_id: productId
                },
                raw: true
            });


            if (!productInCart) {
                return res.status(404).json({ error: 'El producto no se encuentra en el carrito.' });
            }

            
            const updateData = {};
            
            if (action === 'increment') {
                updateData.quantity = productInCart.quantity + 1;
            } else if (action === 'decrement' && productInCart.quantity > 1) {
                updateData.quantity = productInCart.quantity - 1;
            }
            
            
            const [rowsAffected, updatedProducts] = await db.ProductCart.update(updateData, {
                where: {
                    product_cart_id: productInCart.product_cart_id
                },
                returning: true // Esto es importante para obtener el objeto actualizado
            });


            if (updatedProducts > 0) {
                console.log('updatedProducts::', updatedProducts);
                res.status(200).json({ 
                    success: true,
                    message: 'Cantidad del producto en el carrito actualizada correctamente' 
                });
            } else {
                res.status(500).json({ error: 'No se pudo actualizar la cantidad del producto en el carrito' });
            }
            

        } catch (error) {
            console.error('Error al actualizar la cantidad del producto en el carrito:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    },



    //@-GETS---------

    getCheckAuthUser: (req, res) => {

        if (req.session.user) {
          return res.status(200).json({ success: true, user: req.session.user });
        } else {
          return res.status(401).json({ success: false, error: 'No autenticado' });
        }
    },

    getCountriesDataRegister: (req, res) => {


        const countriesArray = ["Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Costa Rica"];

      
        res.status(200).json({
          countries: countriesArray,
        });
    },

    getUserLogin: (req, res) => {

        const {errors} = req.query;

        if (errors) {
            return res.status(400).json({ errors });
        };

        res.status(200).json({ message: 'Login successful' });
        
    },

    getUserEdit: async (req, res) => {

        try {
            const errors = req.query;

            res.status(200).json({ errors });

        } catch (error) {
            console.error(error);
            res.status(500).json('Server error');
        };

    },

    getUserProducts: async (req, res) => {


        try {
            const userId = req.params.id;

            const userProduct = await db.Product.findAll({
                where: {
                    user_id: userId
                },
                include: ['productCategory', 'productBrand'],
                raw: true,
                nest: true
            });

            if (userProduct.length === 0) {
               return res.status(404).json({ message: 'No se encontraron productos para el usuario' });
            }

            const modifiedProducts = userProduct.map((product) => ({
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

            res.status(200).json({count: modifiedProducts.length, products: modifiedProducts });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al obtener los productos del usuario' });
        };
    },

    getViewOrders: async (req, res) => {
        try {
            const userId = req.params.id;
    
            const orders = await db.Order.findAll({
                where: {
                    user_id: userId
                },
                include: [
                    {
                        model: db.Product,
                        through: {
                            model: db.OrderProduct,
                            as: 'orderProducts',
                            attributes: ['quantity'] // Incluir la propiedad quantity
                        },
                        as: 'products',
                    }
                ],
                raw: true,
                nest: true
            });
    
            // Crear una estructura para los datos a mostrar en la vista
            const ordersData = [];
            let currentOrder = null;
    
            for (const order of orders) {
                // Comprobar si es un nuevo pedido
                if (currentOrder === null || currentOrder.order_id !== order.order_id) {
                    currentOrder = {
                        order_id: order.order_id,
                        order_date: order.order_date,
                        user_id: order.user_id,
                        quantity: order.products.orderProducts.quantity, // Acceder a la cantidad desde OrderProduct
                        products: [],
                    };
    
                    ordersData.push(currentOrder);
                }
    
                // Agregar detalles del producto al pedido actual
                const productDetails = {
                    product_id: order.products.product_id,
                    name: order.products.name,
                    description: order.products.description,
                    price: order.products.price,
                    united: order.products.united,
                    discount: order.products.discount,
                    material: order.products.material,
                    state: order.products.state,
                    image: order.products.image,
                    color_id: order.products.color_id,
                    category_id: order.products.category_id,
                    brand_id: order.products.brand_id,
                };
    
                currentOrder.products.push(productDetails);
            }
    
            res.status(200).json({ orders: ordersData });
    
        } catch (error) {
            console.error('Error al obtener las órdenes:', error);
            res.status(500).json({ error: 'Error al obtener las órdenes' });
        }
    },
    
    


    getAvatar: async (req, res) => {

        
        try {
            const user = await db.User.findOne({ where: {user_id: req.params.id}, raw: true }); 
    
            if (!user.avatar) {
               return res.status(404).json({ error: '¡Avatar no encontrado!' });
            };

            const avatarPath = path.join(__dirname, '..', '..', '/public/img/avatars', user.avatar);

            fs.readFile(avatarPath, (err, data) => {
                if (err) {
                    console.error(err);
                    return res.status(404).json({ error: 'La imagen no existe' });
                };

                res.writeHead(200, {'Content-Type': 'image/jpeg'});
                res.end(data, 'binary');
                
            });
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error en la ejercución del servidor' }); 
        };
    },

    getProductsInCart: async (req, res) => {

        try {
            // Obtener el ID del usuario que ha iniciado sesión (ajusta según tu sistema de autenticación)
            const userId = req.params.id;

            // Buscar el carrito del usuario actual
            const cart = await db.Cart.findOne({
                where: {
                    user_id: userId
                },
                include: 'products',
                raw: true,
                nest: true
            });

            if (!cart || (cart.cart_id === null )) {
                // Si el usuario no tiene un carrito, puedes mostrar un mensaje o redirigir a una página vacía de carrito
                return res.status(404).json({ success: false, message: 'Aun no has agregado productos al carrito' });
            }

            if (!cart || (cart.products.ProductCart.quantity === null)) {
                // Si el usuario no tiene un carrito, puedes mostrar un mensaje o redirigir a una página vacía de carrito
                return res.status(404).json({ success: false, message: 'Carrito vacío' });
            }

            const cartProducts = await db.Cart.findAll({
                where: {
                    cart_id: cart.cart_id
                },
                include: 'products',
                raw: true,
                nest: true,
            });


            if (!cartProducts || cartProducts.length === 0) {
                return res.status(404).json({ success: false, message: 'Carrito vacío' });
            }
            



            const userCartProducts = cartProducts.map((data) => ({
                cart_id: data.cart_id,
                user_id: data.user_id,
                productsInCart: {
                    product_id: data.products.product_id,
                    name: data.products.name,
                    price: data.products.price,
                    united: data.products.united,
                    image: `/api/product/image/${data.products.product_id}`,
                    quantity: data.products.ProductCart.quantity,
                    endPoints: {
                        updateQuantity: `/api/user/productsInCart/update/${data.products.product_id}`,
                        deleteProductInCart: `/api/user/productInCart/delete/${data.products.product_id}/${data.user_id}`
                    }
                }, 
            }));


           // Devuelve los productos en el carrito como respuesta JSON
           res.status(200).json({ userCartProducts });

        } catch (error) {
            console.error('Error al ver el carrito:', error);
            res.status(500).json({ error: 'Error interno del servidor' });
        }

    },

    //GETS PRINCIPALES DASHBOARD
    getAllUsers: async (req, res) => {


        try {
            
            const page = parseInt(req.query.page) || 1; // Página solicitada, predeterminada a 1 si no se proporciona
            const itemPage = 10; // Número de usuarios por página
            const offset = (page - 1) * itemPage; // Calcula el offset

            const users = await db.User.findAll(
            { 
                raw: true, 
                attributes: { exclude: ['password'] }, 
                limit: itemPage,
                offset: offset
            });



            if (users.length === 0 || !users) {
                return res.status(404).json({error: 'No se encontro ningún usuario' });
            };

            const modifiedUsers = users.map((user) => ({
                user_id: user.user_id,
                first_name: user.first_name,
                last_name: user.last_name,
                username: user.username,
                email: user.email,
                avatar: user.avatar,
                country: user.country,
                city: user.city,
                address: user.address,
                birthDate: user.birthDate,
                gender: user.gender,
                detail: `/api/user/${user.user_id}`
            }));

            const endPointsUsers = {
                createUser: "/api/user/create",
                userLogin: "/api/user/login",
                userLogout: "/api/user/logout"
            };

            // Calcula las URLs de next y previous
            const nextUrl = users.length === itemPage ? `/api/users?page=${page + 1}` : null;
            const previousUrl = page > 1 ? `/api/users?page=${page - 1}` : null;

                
            res.status(200).json({ 
                count: users.length, 
                endPointsUsers, 
                users: modifiedUsers,
                nextUrl,
                previousUrl
            });

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error del servidor' });
        }

    },

    getFindOneUser: async (req, res) => {
        try {

            const userId = req.params.id;

            const user = await db.User.findOne({
                where: {user_id: userId},
                raw: true,
                attributes: { exclude: ['password'] },
            });

            if (user.length === 0 || !user) {
                return res.status(404).json({error: 'No se encontro ningún usuario' });
            };

            const avatarImageUrl = `/api/user/avatar/${user.user_id}`;

            const userData = {
                user: {
                    user_id: user.user_id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    username: user.username,
                    email: user.email,
                    password: user.password,
                    avatar: avatarImageUrl,
                    country: user.country,
                    city: user.city,
                    address: user.address,
                    birthDate: user.birthDate,
                    gender: user.gender,
                },
                products: {
                    allProducts: `/api/user/products/${userId}`,
                },
                userEndPoints: {
                    edit: `/api/user/edit/${userId}`,
                    delete: `/api/user/delete/${userId}`
                },
                orders: {
                    view: `/api/user/orders/${userId}`,
                    create: `/api/user/order/create/${userId}`
                },
                userCart: {
                    addProductCart: `/api/user/addProductCart/${userId}`,
                    viewProductsCart: `/api/user/productsInCart/${userId}`
                },
                avatarImageUrl
            };

            res.status(200).json(userData);
            
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error del servidor' });
        }
    }
}




module.exports = userController;