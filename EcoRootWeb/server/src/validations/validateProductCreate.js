const { body } = require('express-validator'); // Express Validator
const upload = require('../middlewares/multerProducts'); // Importa el multer de usuario


const productCreateMiddleware = {

    //Validations Form-Product "Body"
    productCreateValidations: [     
        body('name').notEmpty().withMessage('Debes ingresar un nombre'),
        body('brand').notEmpty().withMessage('Debes ingresar una marca'),
        body('discount').notEmpty().withMessage('Debes ingresar almenos un numero de descuento'),
        body('color').notEmpty().withMessage('Debes ingresar un color'),

/*         body('color').notEmpty().withMessage('Debes ingresar un color'), */
        body('united').notEmpty().withMessage('Debes ingresar una unidad de stocks'),
/*         body('discount').notEmpty().withMessage('campo incompleto'), */
        body('material').notEmpty().withMessage('Debes ingresar el material de tu producto'),
        body('state').notEmpty().withMessage('Debes ingresar el estado de tu producto').bail().isIn(['New', 'Used']).withMessage('Debes seleccionar un estado válido'),
        body('description')
            .notEmpty().withMessage('Debes ingresar una descripción')
            .isLength({ max: 300 }).withMessage('La descripción no debe tener más de 300 caracteres'),
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


module.exports = productCreateMiddleware;