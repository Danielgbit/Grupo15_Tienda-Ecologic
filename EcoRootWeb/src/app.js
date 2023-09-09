const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
const dotenv = require('dotenv').config();
const methodOverride = require('method-override');
const cookie = require('cookie-parser');
const userLoggedMiddleware = require('./middlewares/userLogged')

//ROUTES

const mainRoute = require ('./routes/mainRoute');
const productsRoute = require ('./routes/productsRoute');
const cartRoute = require ('./routes/cartRoute');
const userRoute = require ('./routes/userRoute');



app.set('view engine', 'ejs');

app.set('views', [
    path.join(__dirname, './views/main'),
    path.join(__dirname, './views/partials'),
    path.join(__dirname, './views/products'),
    path.join(__dirname, './views/user'),
]);


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(express.static('./public'));

app.use(methodOverride('_method'));

app.use(session({
    secret: "Secreto",
    resave: false,
    saveUninitialized: false
}));

app.use(userLoggedMiddleware);

app.use(cookie());

app.use('/', mainRoute);

app.use('/cart', cartRoute);

app.use('/products', productsRoute);

app.use('/user', userRoute );

app.use((req, res) => {
    res.render('error');
});



app.listen(3000, () => {
    console.log('servidor ' + process.env.PORT + ' en funcionamiento - http://localhost:3000');
});


