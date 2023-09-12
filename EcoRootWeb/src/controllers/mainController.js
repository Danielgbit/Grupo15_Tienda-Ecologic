const modelProducts = require('../models/productsModels');

const products = modelProducts.findAll()



const mainController = {
    home: (req, res) => {
        

        const filteredProducts = products.filter((product, index) => index < 2);
        
        res.render('index', {product: filteredProducts});
    },

};


module.exports = mainController;