const userModels = require('../models/usersModels');
const uuid = require('uuid');
const {validationResult} = require('express-validator');
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
        })
    },


    loginProcess: (req, res) => {


        dataOld = req.body || {};

        const userinUse = userModels.findByEmail(req.body.email);

        //SESSION

        if (userinUse) {

            req.session.user = userinUse;
        }

        //@COOKIES

        if (req.body.remember) {

            const unaSemanaEnSegundos = 7 * 24 * 60 * 60;
            const maxAge = unaSemanaEnSegundos * 1000; // duracion una semana;

            res.cookie('uEmail', req.body.email, {
                maxAge
            });

        }

        //Validations

        const result = validationResult(req);

        if (result.errors.length > 0) {

            const queryArray = result.errors.map(errors => "&" + errors.path + "=" + errors.msg);

            const queryErrors = queryArray.join('');

            res.redirect('/user/login?admin=true' + queryErrors);


            return;
        };

        const errors = {
            email: 'el email es incorrecto',
            password: 'la contraseña no coincide'
        };

        if (!userinUse) {

            res.redirect('/user/login?email=' + errors.email);

            return;
        };


        const validPassword = bcrypt.compareSync(req.body.password, userinUse.password);

        if (!validPassword) {

            res.redirect('/user/login?password=' + errors.password);

            return;
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



        if (result.errors.length > 0) {

            fs.unlinkSync(path.join(__dirname, '../../public/img/avatars/' + req.file.filename));

            const queryArray = result.errors.map(errors => "&" + errors.path + "=" + errors.msg);

            const queryErrors = queryArray.join('');

            return res.redirect('/user/register?admin=true' + queryErrors);

        }



        const newUser = {
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

           const userNew = await db.User.create(newUser);

           console.log(userNew);
            
        } catch (error) {
            console.error(error);
        }


/* 
        if (user && user.email) {

            res.redirect('/user/register?email=' + user.email);

            return;
        }; */

        res.send('Usuario creado');

    },

    getUserPage: (req, res) => {

        /* const products = modelProducts.findAll(); */


        res.render('user');
    },

    logout: (req, res) => {

        res.clearCookie('uEmail');
        req.session.destroy();

        res.redirect('/');
    },

    deleteUser: (req, res) => {

        const userId = req.params.id;

        const user = userModels.findByPk(req.params.id);

        fs.unlinkSync(path.join(__dirname, '../../public/img/avatars/' + user.avatar));

        userModels.destroy(userId);

        res.redirect('/');
    
    },

    getEdit: (req, res) => {

        const countriesArray = ["Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Costa Rica"];

        const errors = req.query;

        res.render('userEdit', { countries: countriesArray, errors });
    },

    updateUser: (req, res) => {

        const result = validationResult(req);

        if (result.errors.length > 0) {

            const queryArray = result.errors.map(errors => "&" + errors.path + "=" + errors.msg);

            const queryErrors = queryArray.join('');

            return res.redirect('/user/:id/edit?admin=true' + queryErrors);

        }

        const user = userModels.findByPk(req.params.id);

        
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
        
        userModels.update(newUser);


            res.redirect('/user');



    }

}

module.exports = userController;