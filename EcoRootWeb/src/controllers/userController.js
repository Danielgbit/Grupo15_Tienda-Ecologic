const { Console } = require('console');
const path = require ('path');
const userModels = require('../models/usersModels');



const userController = {
    login: (req, res) => {
        res.render('login')
    },

    register: (req, res) => {
        res.render('register')
    },

    postRegisterUser: (req, res) =>{
        res.redirect('/')
        console.log(req.body);
        const newUser = {
            email: req.body.email,
            password: req.body.password,
            nombre: req.body.first_name,
            apellido: req.body.last_name,
            pais: req.body.country,
            ciudad: req.body.city,
            direccion: req.body.address,
            fechaDeNacimiento: req.body.birthDate,
            username: req.body.username,
            genero: req.body.gender,
            telefono: req.body.phoneNumber
        }
        userModels.userLogin(newUser)
    },




}

module.exports = userController;