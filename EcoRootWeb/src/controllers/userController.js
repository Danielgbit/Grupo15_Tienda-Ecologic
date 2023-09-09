const path = require ('path');
const userModels = require('../models/usersModels');
const uuid = require('uuid');
const modelProducts = require('../models/productsModels');
const { validationResult } = require('express-validator');
const { log, error } = require('console');
const bcrypt = require('bcrypt');


// Datos temporales
let dataOld = {};
let dataOldRegister = {};



const userController = {
    login: (req, res) => {

        res.render('login', {errors: req.query, dataOld})
    },


        //POST LOGIN
    loginProcess: (req, res) => {

        /*let userToLog = userModels.findByField('email', req.body.email);

        if(userToLog) {
            let realPassword = bcrypt.compareSync(req.body.password, userToLog.password);
            if (realPassword) {
                delete userToLog.password;
                req.session.userLogged = userToLog;

                if(req.body.recordame) {
                    res.cookie('userEmail', req.body.email, { maxAge: (1000 * 60) * 60  })
                }

                return res.redirect('/user');
            }
            return res.render('login', {
                errors: {
                    email: {
                        msg: 'Credenciales inválidas'
                    }
                }
            });
        }
        return res.render('login', {
                errors: {
                    email: {
                        msg: 'Email no coincide'
                    }
                }
            })
        */

        dataOld = req.body || {};

        const userinUse = userModels.findByEmail(req.body.email);

        const errors = {
            email: 'el email es incorrecto'   
        };

        if (!userinUse) {

            res.redirect('/user/login?email=' + errors.email);

            return
        }

        const result = validationResult(req);

        if (result.errors.length > 0) {

            const queryArray = result.errors.map(errors => "&" + errors.path + "=" + errors.msg)

            const queryErrors = queryArray.join('')

            res.redirect('/user/login?admin=true' + queryErrors);
            

            return;
        }

        res.redirect('/');
    },

    register: (req, res) => {

        console.log(req.query);

        const countriesArray = ["Argentina", "Bolivia", "Brasil", "Chile", "Colombia", "Costa Rica"];

        res.render('register', {countries: countriesArray, errors: req.query, dataOld: dataOldRegister});
    },

    postRegisterUser: (req, res) =>{


        dataOldRegister = req.body || {};

        const result = validationResult(req);

        
        
        if (result.errors.length > 0) {
            
            const queryArray = result.errors.map(errors => "&" + errors.path + "=" + errors.msg)
            
            const queryErrors = queryArray.join('')
            
            return res.redirect('/user/register?admin=true' + queryErrors);
            
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
            avatar: req.file.filename
        };
        
        
        const user = userModels.createUser(newUser); // Asumo que aquí se genera 'user'


        
        if (user && user.email) {

            res.redirect('/user/register?email=' + user.email);

            return;
        };

        res.redirect('/user/login');
        
    },
    
    getUserPage: (req, res) => {
        
        const products = modelProducts.findAll();
        
        res.render('user', {product: products}/*, {
            user: req.session.userLogged 
        }*/);

    },

    logout: (req, res) => {
        res.clearCookie('userEmail');
        req.session.destroy()
        return res.redirect('/')
    }
    
    
}

module.exports = userController; 