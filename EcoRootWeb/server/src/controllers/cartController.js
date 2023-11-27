const path = require ('path');


const cartController = {
    cart: (req, res) => {
        res.render('productCart');
    },
}


module.exports = cartController;