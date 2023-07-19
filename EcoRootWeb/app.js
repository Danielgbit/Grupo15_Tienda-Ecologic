const express = require('express');

const path = require('path');

const app = express();

const dotenv = require('dotenv').config()


app.listen(3000, () => {
    console.log('servidor ' + process.env.PORT + ' en funcionamiento - http://localhost:3000');
});

app.use(express.static('public'));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});

app.get('/products', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/products.html'));
});

app.get('/productDetail', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/productDetail.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/login.html'));
});


app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/register.html'));
});

app.get('/productCart', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/productCart.html'));
});