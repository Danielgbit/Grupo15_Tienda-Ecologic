const path = require ('path');


const createController = {
    createCategory: (req, res) => {
        res.render('createCategory')
    },

    createCondition: (req, res) => {
        res.render('createCondDes')
    },

    createInformation: (req, res) => {
        res.render('createInformation')
    },

    createImage: (req, res) => {
        res.render('createImagePrice')
    },



}


module.exports = createController;