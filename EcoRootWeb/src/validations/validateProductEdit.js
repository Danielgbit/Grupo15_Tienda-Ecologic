const { body } = require('express-validator'); // Express Validator



const productEditMiddleware = {

    //Validations Form-Product "Body"
    productEditValidations: [     
        body('name').notEmpty().withMessage('Debes ingresar un nombre'),
        body('brand').notEmpty().withMessage('Debes ingresar una marca'),
/*         body('color').notEmpty().withMessage('Debes ingresar un color'), */
        body('united').notEmpty().withMessage('Debes ingresar una unidad de stock'),
/*         body('discount').notEmpty().withMessage('campo incompleto'), */
        body('material').notEmpty().withMessage('Debes ingresar el material de tu producto'),
        body('state').notEmpty().withMessage('Debes ingresar el estado de tu producto'),
        body('description')
        .notEmpty().withMessage('Debes ingresar una descripción')
        .isLength({ max: 189 }).withMessage('La descripción no debe tener más de 189 caracteres'),
        body('price').notEmpty().withMessage('Ingresa el precio de tu producto'),
        body('category').notEmpty().withMessage('Ingresa una categoria'),
        body('image').custom((value, { req }) => {
            if (!req.file || !req.file.filename) {
                throw new Error('El archivo de imagen es obligatorio');
            }
            return true;
        })
    ]
};


module.exports = productEditMiddleware;