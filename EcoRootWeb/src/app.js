const express = require('express');
const path = require('path');
const app = express();
const dotenv = require('dotenv').config();

//ROUTES

const mainRoute = require ('./routes/mainRoute');
const productsRoute = require ('./routes/productsRoute');
const cartRoute = require ('./routes/cartRoute');
const userRoute = require ('./routes/userRoute');
const createRoute = require ('./routes/createRoute');


app.listen(3000, () => {
    console.log('servidor ' + process.env.PORT + ' en funcionamiento - http://localhost:3000');
});


app.use(express.static('./public'));

app.use('/', mainRoute);

app.use('/cart', cartRoute);

app.use('/products', productsRoute);

app.use('/user', userRoute );

app.use('/create', createRoute);


app.set('view engine', 'ejs');

app.set('views', [
    path.join(__dirname, './views/main'),
    path.join(__dirname, './views/partials'),
    path.join(__dirname, './views/products'),
    path.join(__dirname, './views/user'),
    path.join(__dirname, './views/productsCreate'),

  ]);




