const models = require('../models/productsModels');
const modelProducts = require('../models/productsModels');

const products = modelProducts.findAll()

const productsController = {

    products: (req, res) => {

        res.render('products', {products: products})
    },


    productDetail: (req, res) => {

        const productId = modelProducts.findById(Number(req.params.id));

        res.render('productDetail', {product: productId});
    },

    //@CREATE


    getproductCreate: (req, res) => {

        res.render('productCreate');
    },


    postProductCreate: (req, res) => {
    
        
        const lastProduct = products[products.length - 1].id;

        console.log(lastProduct);

        const newProduct = {
            id: lastProduct + 1,
            name: req.body.name,
            brand: req.body.brand,
            united: Number(req.body.united),
            category: req.body.category,
            material: req.body.material,
            state: req.body.state,
            image: req.file.filename,
            description: req.body.description,
            color: req.body.color,
            discount: Number(req.body.discount),
            price: Number(req.body.price),
        };

        models.createProduct(newProduct);

        res.redirect('/products');
    
    },

    productDestroy: (req, res) => {

        let newArrayProducts = products.filter((products) => products.id !== Number(req.params.id));

        models.destroyProduct(newArrayProducts);

        res.redirect('/products');

    },

    
    getEdit: (req, res) => {
        
        const productId = models.findById(Number(req.params.id));
        
        res.render('productEdit', {product: productId});
    },
    
    
    //PUT
    

    putProductEdit: (req, res) => {

        
        const productEdit = {
            id: Number(req.params.id),
            name: req.body.name,
            brand: req.body.brand,
            united: Number(req.body.united),
            category: req.body.category,
            material: req.body.material,
            state: req.body.state,
            image: req.body.image,
            description: req.body.description,
            color: req.body.color,
            discount: Number(req.body.discount),
            price: Number(req.body.price),
        }
        
      
        models.editProduct(productEdit);

        res.redirect('/products/'+ productEdit.id +'/detail');
    }
}


module.exports = productsController;