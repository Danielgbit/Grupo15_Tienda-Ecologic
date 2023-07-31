const express = require ('express');
const createRouter = express.Router();
const createController = require ('../controllers/createController');


createRouter.get('/category', createController.createCategory);

createRouter.get('/information', createController.createInformation);

createRouter.get('/conditionDes', createController.createCondition);

createRouter.get('/imagePrice', createController.createImage);


module.exports = createRouter;




