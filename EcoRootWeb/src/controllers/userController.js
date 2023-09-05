const { Console } = require('console');
const path = require ('path');
const userModels = require('../models/usersModels');
const uuid = require('uuid');
const modelProducts = require('../models/productsModels');
const { validationResult } = require('express-validator');

let dataOld = {};


let dataOldRegister = {};



const userController = {
    login: (req, res) => {


        res.render('login', {errors: req.query, dataOld})
    },


        //POST LOGIN
    loginProcess: (req, res) => {

        dataOld = req.body || {};

        const result = validationResult(req);

        if (result.errors.length > 0) {

            const queryArray = result.errors.map(errors => "&" + errors.path + "=" + errors.msg)

            const queryErrors = queryArray.join('')

            res.redirect('/user/login?admin=true' + queryErrors);
            

            return;
        }
    },

    register: (req, res) => {


        console.log(dataOldRegister);

        const countriesArray = ["Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Costa Rica"];

        res.render('register', {countries: countriesArray, errors: req.query, dataOld: dataOldRegister});
    },

    postRegisterUser: (req, res) =>{



        dataOldRegister = req.body || {};

        const result = validationResult(req);


        if (result.errors.length > 0) {

            const queryArray = result.errors.map(errors => "&" + errors.path + "=" + errors.msg)

            const queryErrors = queryArray.join('')

            res.redirect('/user/register?admin=true' + queryErrors);
            

            return;
        }
        

        
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