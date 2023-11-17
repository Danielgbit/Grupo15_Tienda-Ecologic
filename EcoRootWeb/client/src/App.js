import './App.scss';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from './components/products/mainProduct/AllProductsMain';
import NavBar from './components/navbar/NavBar';
import ContainerUpdateProduct from './components/products/mainProduct/Update/ContainerUpdateProduct';
import ProductDetailContainer from './components/products/productDetail/ProductDetailContainer';
import ContainerProductCreate from './components/products/mainProduct/Create/ContainerProductCreate';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar/>
        <Routes>

          <Route path="/products" element={<Products/>} />

          <Route path="/product/detail/:id" element={<ProductDetailContainer/>} />

          <Route path="/product/edit/:id" element={<ContainerUpdateProduct/>} />

          <Route path="/products/create" element={<ContainerProductCreate/>} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
