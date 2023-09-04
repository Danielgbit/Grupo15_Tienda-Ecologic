const { Console } = require('console');
const path = require ('path');
const userModels = require('../models/usersModels');
const uuid = require('uuid');

const modelProducts = require('../models/productsModels');





const userController = {
    login: (req, res) => {
        res.render('login')
    },

    loginProcess: (req, res) => {
        return res.send(req.body);
    },

    register: (req, res) => {

        const countriesArray = ["Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Costa Rica"];

        res.render('register', {countries: countriesArray});
    },

    postRegisterUser: (req, res) =>{

        
        const newUser = {
            id: uuid.v4(),
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
        };
        
        userModels.createUser(newUser);

        res.redirect('/user/login')
    },

    getUserPage: (req, res) => {

        const products = modelProducts.findAll();

        res.render('user', {product: products});
    }

}

module.exports = userController;