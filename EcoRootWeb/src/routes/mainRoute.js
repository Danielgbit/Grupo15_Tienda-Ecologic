const express = require ('express');
const routerMain = express.Router();
const mainController = require ('../controllers/mainController');


routerMain.get('/', mainController.home);


module.exports = routerMain;