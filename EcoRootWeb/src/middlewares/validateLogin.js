const { body } = require('express-validator');



const loginMiddleware = {

    validateLogin: [
        body('email').notEmpty().withMessage('Debes agregar un email').isEmail().withMessage('El correo electrónico no es válido'),
        body('password').notEmpty().withMessage('La contraseña es requerida'),
    ]
};


module.exports = loginMiddleware;