const uuid = require('uuid');
const {
    validationResult
} = require('express-validator');
const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');
const db = require('../database/models');

// Datos temporales
let dataOld = {};
let dataOldRegister = {};


const userController = {

    login: (req, res) => {

        res.render('login', {
            errors: req.query,
            dataOld
        });

    },


    loginProcess: async (req, res) => {

        dataOld = req.body || {};
        const result = validationResult(req);
        const errors = {
            email: 'el email es incorrecto',
            password: 'la contraseña no coincide'
        };

        //Express validator
        if (result.errors.length > 0) {
            const queryArray = result.errors.map(errors => "&" + errors.path + "=" + errors.msg);
            const queryErrors = queryArray.join('');
            res.redirect('/user/login?admin=true' + queryErrors);

            return;
        };

        const userinUse = await db.User.findOne({
            where: {
                email: req.body.email,
            },
            raw: true
        });



        if (!userinUse) {
            res.redirect('/user/login?email=' + errors.email);
            return;
        };

        const validPassword = bcrypt.compareSync(req.body.password, userinUse.password);

        if (!validPassword) {

            res.redirect('/user/login?password=' + errors.password);

            return;
        };

        //@COOKIES

        if (req.body.remember) {

            const unaSemanaEnSegundos = 7 * 24 * 60 * 60;
            const maxAge = unaSemanaEnSegundos * 1000; // duracion una semana;

            res.cookie('uEmail', userinUse, {
                maxAge,
                secure: true, // Solo enviar la cookie a través de HTTPS
                httpOnly: true,
            });

        };

        if (userinUse) {

            req.session.user = userinUse;
        };

        res.redirect('/');
    },

    register: (req, res) => {


        const countriesArray = ["Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Costa Rica"];

        res.render('register', {
            countries: countriesArray,
            errors: req.query,
            dataOld: dataOldRegister
        });
    },

    postRegisterUser: async (req, res) => {


        dataOldRegister = req.body || {};

        const result = validationResult(req);



        if (req.file) {
            // Si hay errores de validación, muestra los errores y no intenta guardar la imagen
            if (result.errors.length > 0) {

                fs.unlinkSync(path.join(__dirname, '../../public/img/avatars/' + req.file.filename));

                const queryArray = result.errors.map(errors => "&" + errors.path + "=" + errors.msg);
                const queryErrors = queryArray.join('');
                return res.redirect('/user/register?admin=true' + queryErrors);
            } // Si no hay errores de validación, procede con el registro del usuario y otras acciones
        } else {
            // Si no se cargó un archivo, muestra los errores de validación sin intentar guardar el archivo
            if (result.errors.length > 0) {
                const queryArray = result.errors.map(errors => "&" + errors.path + "=" + errors.msg);
                const queryErrors = queryArray.join('');
                return res.redirect('/user/register?admin=true' + queryErrors);
            }
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

                const error = {
                    email: `el email ya esta en uso`
                };

                res.redirect(`/user/register?email=${error.email}`);

                return;
            };

        } catch (error) {
            console.error(error);
        }



        try {

            newUser.password = bcrypt.hashSync(newUser.password, 10);

            await db.User.create(newUser);

            res.redirect('/user/login');

        } catch (error) {
            console.error(error);
        };

    },

    getUserPage: (req, res) => {

        res.render('user');
    },

    logout: (req, res) => {

        res.clearCookie('uEmail');
        req.session.destroy();

        res.redirect('/');
    },

    deleteUser: async (req, res) => {


        try {
            const userId = await db.User.findByPk(req.params.id, {
                raw: true
            });

            await db.User.destroy({
                where: {
                    user_id: req.params.id
                }
            });

            fs.unlinkSync(path.join(__dirname, '../../public/img/avatars/' + userId.avatar));

            res.clearCookie('uEmail');
            req.session.destroy();

            res.redirect('/');

        } catch (error) {
            console.error(error);
        }

    },

    getEdit: async (req, res) => {

        const countriesArray = ["Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Costa Rica"];

        const errors = req.query;

        res.render('userEdit', {
            countries: countriesArray,
            errors
        });
    },

    updateUser: async (req, res) => {

        const result = validationResult(req);

        if (result.errors.length > 0) {

            const queryArray = result.errors.map(errors => "&" + errors.path + "=" + errors.msg);

            const queryErrors = queryArray.join('');

            return res.redirect('/user/:id/edit?admin=true' + queryErrors);

        }


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
                    // Actualizar la sesión con los datos del usuario actualizado
                    req.session.user = updatedUser;
                }
            }


            res.redirect('/user');

        } catch (error) {
            console.error(error);
        };

    },

    getUserProducts: async (req, res) => {


        try {
            const userId = req.session.user.user_id;

            const userProduct = await db.Product.findAll({
                where: {
                    user_id: userId
                },
                include: ['productCategory'],
                raw: true,
                nest: true
            });

            res.render('userProducts', {
                products: userProduct
            });

        } catch (error) {
            console.error(error);
        };
    },

    createOrder: async (req, res) => {
        try {
            const userId = req.session.user.user_id;

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

            // Suponiendo que cartProducts es un array de objetos con propiedades product_id y quantity
            cartProducts.forEach(async (product) => {

                await db.OrderProduct.create({
                    order_id: newOrder.order_id,
                    product_id: product.product_id,
                    quantity: product.quantity,
                });
            });


            res.redirect('/user/orders');

        } catch (error) {
            console.error('Error al crear la orden:', error);
        }

    },

    viewOrders: async (req, res) => {

        try {
            const userId = req.session.user.user_id;

            // Obtener los pedidos del usuario con sus productos asociados
            const orders = await db.Order.findAll({
                where: {
                    user_id: userId
                },
                include: 'products',
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
                        products: []
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
                    brand_id: order.products.brand_id
                    // Agrega más propiedades del producto si es necesario
                };

                currentOrder.products.push(productDetails);
            }


            // Enviar los datos estructurados a la vista
            res.render('userOrders', {
                orders: ordersData
            });


        } catch (error) {
            console.error('Error al obtener las órdenes:', error);
        }
    },

    getAllusers: async (req, res) => {

        try {

            const users = await db.User.findAll({ raw: true, nest: true });

            const usersUrls = [];

            users.map((user) => {
                usersUrls.push({
                    url: `http://localhost:3000/user/${user.user_id}/detail`
                });
            });


            if (users) {
                res.json({
                    count: users.length,
                    users,
                    usersUrls
                });
            } else {
                res.status(404).json({ error: 'No se encontro ningun usuario' })
            };

        } catch (error) {
            res.status(500).json({ error: 'Error del servidor' });
        };
    },

    userDetail: async (req, res) => {

        try {

            const userDetail = await db.User.findByPk(req.params.id, {
                raw: true
            });

            if (userDetail) {
                res.json({ userDetail });
            } else {
                res.status(404).json({ error: 'No se encontro ningun usuario' })
            };

        } catch (error) {
            res.status(500).json({ error: 'Error del servidor' });
        };
    },

}

module.exports = userController;