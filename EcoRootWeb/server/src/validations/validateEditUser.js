const { body } = require('express-validator');


const userEditMiddleware = {

    validateuserEdit: [
        body('first_name')
        .bail()
        .notEmpty().withMessage('Debes ingresar un nombre')
        .bail()
        .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),
        body('last_name')
        .notEmpty().withMessage('Debes proporcionar un apellido'),
        body('username')
        .notEmpty().withMessage('Debes proporcionar un nombre de usuario'),
        body('email')
        .bail()
        .notEmpty().withMessage('Debes proporcionar un correo electrónico')
        .bail()
        .isEmail().withMessage('El correo electrónico no es válido'),
        body('password')
        .bail()
        .notEmpty().withMessage('Debes proporcionar una contraseña')
        .bail()
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
        .bail()
        .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una letra mayúscula')
        .bail()
        .matches(/\d/).withMessage('La contraseña debe contener al menos un número')
        .bail()
        .matches(/[!@#$%^&*]/).withMessage('La contraseña debe contener al menos un carácter especial: !@#$%^&*'),
        body('country')
        .notEmpty().withMessage('Debes seleccionar un país'),
        body('city')
        .notEmpty().withMessage('Debes proporcionar una ciudad'),
        body('address')
        .notEmpty().withMessage('Debes proporcionar una dirección')
        .bail()
        .matches(/\d/).withMessage('La dirección debe contener al menos un número,')
        .bail()
        .isLength({max: 20}).withMessage('Solo puedes ingresar maximo 20 caracteres'),
        body('birthDate')
        .notEmpty().withMessage('Debes proporcionar una fecha de nacimiento'),
        body('gender')
        .notEmpty().withMessage('Debes seleccionar un género'),
    ]
};


module.exports = userEditMiddleware;