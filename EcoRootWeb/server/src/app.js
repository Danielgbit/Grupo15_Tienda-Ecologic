const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();


const methodOverride = require('method-override');
const cookies = require('cookie-parser');
const session = require('express-session');
const userLogged = require('./middlewares/userLoggedMiddleware');

//ROUTES

const mainRoute = require('./routes/mainRoute');
const productsRoute = require('./routes/productsRoute');
const cartRoute = require('./routes/cartRoute');
const userRoute = require('./routes/userRoute');
const { cookie } = require('express-validator');



app.set('view engine', 'ejs');

app.set('views', [
    path.join(__dirname, './views/main'),
    path.join(__dirname, './views/partials'),
    path.join(__dirname, './views/products'),
    path.join(__dirname, './views/user'),
]);

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

app.use(methodOverride('_method'));

app.use(express.static('./public'));

app.use(cookies());



app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
}));

app.use(session({
    secret: 'EcoRoot@#!nDsGRW',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true, // solo se enviará en conexiones HTTPS
        sameSite: 'none' // necesario si tu aplicación se carga en un iframe desde otro dominio
    }
}));



app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

app.use(userLogged);

app.use('/', mainRoute);

app.use('/cart', cartRoute);

app.use('/api', productsRoute);

app.use('/api', userRoute);

app.use((req, res) => {
    res.render('error');
});



app.listen(3000, () => {
    console.log(`servidor ${process.env.PORT} en funcionamiento http://localhost:${process.env.PORT}`);
});