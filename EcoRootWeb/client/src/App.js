import './App.scss';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/main/Home';
import NavBar from './components/navbar/NavBar';
import Products from './components/products/mainProduct/AllProductsMain';
import ContainerUpdateProduct from './components/products/mainProduct/Update/ContainerUpdateProduct';
import ProductDetailContainer from './components/products/productDetail/ProductDetailContainer';
import ContainerProductCreate from './components/products/mainProduct/Create/ContainerProductCreate';
import Footer from './components/partials/footer';
import ContainerLoginUser from './components/users/mainUsers/ContainerLoginUser';
import ContainerRegisterUser from './components/users/mainUsers/ContainerRegister';
import UserConfig from './components/users/userConfig/UserConfig';
import ContainerUserUpdate from './components/users/update/ContainerUpdateUser';
import UserProducts from './components/users/userProducts/UserProducts';
import UserOrders from './components/users/userOrders/UserOrders';
import ProductsInCart from './components/cart/ProductsInCart';





function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <Routes>

          <Route path="/" element={<Home/>} />

          <Route path="/products" element={<Products/>} />

          <Route path="/product/detail/:id" element={<ProductDetailContainer/>} />

          <Route path="/product/edit/:id" element={<ContainerUpdateProduct/>} />

          <Route path="/products/create" element={<ContainerProductCreate/>} />

          <Route path="/user/login" element={<ContainerLoginUser/>} />

          <Route path="/user/register" element={<ContainerRegisterUser/>} />

          <Route path="/user/config" element={<UserConfig/>} />

          <Route path="/user/:id/edit" element={<ContainerUserUpdate/>} />

          <Route path="/user/:id/products" element={<UserProducts/>} />

          <Route path="/user/:id/orders" element={<UserOrders/>} />

          <Route path="/user/:id/productsInCart" element={<ProductsInCart/>} />

        </Routes>
          <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
