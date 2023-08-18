const fs = require('fs');
const path = require('path');



const models = {

    routeJson: path.join(__dirname, '../data/products.json'),

    findAll: () => {
        const productsJSON = fs.readFileSync(models.routeJson, 'utf-8');

        products = JSON.parse(productsJSON);

        return products;
    },


    findById: (id) => {

        const products = models.findAll();

        const productId = products.find((product) => product.id === id);

        return productId;
    },

    createProduct: (productNew) => {

        const products = models.findAll();

        products.push(productNew);

        const newProduct = JSON.stringify(products);

        fs.writeFileSync(models.routeJson, newProduct, 'utf-8');
    },

    destroyProduct: (products) => {

        newArrayProducts = JSON.stringify(products);

        fs.writeFileSync(models.routeJson, newArrayProducts, 'utf-8');
    },

    editProduct: (productEdit) => {
        
        let products = models.findAll();

        

        const productIndex = products.findIndex((product) => product.id === productEdit.id);

        products[productIndex] = productEdit;

        const productJSON = JSON.stringify(products);

        fs.writeFileSync(models.routeJson, productJSON, 'utf-8');

    }

}

module.exports = models;