const { body } = require('express-validator'); // Express Validator


const validationsMiddlewares = {

    //Validations Form-Product "Body"
    productCreateValidations: [     
        body('name').notEmpty().withMessage('Campo incompleto'),
        body('brand').notEmpty().withMessage('Campo incompleto'),
        body('color').notEmpty().withMessage('Campo incompleto'),
        body('united').notEmpty().withMessage('Campo incompleto'),
        body('discount').notEmpty().withMessage('Campo incompleto'),
        body('material').notEmpty().withMessage('Campo incompleto'),
        body('state').notEmpty().withMessage('Debes seleccionar la condición de tu producto'),
    ]
};


module.exports = validationsMiddlewares;