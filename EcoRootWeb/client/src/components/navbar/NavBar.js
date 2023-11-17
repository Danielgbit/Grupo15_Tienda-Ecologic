import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const NavBar = () => {
    
    const [session, setSession] = useState([]);

    useEffect(() => {
        setSession([]);
    }, []);


    return (
        <nav className="bar-nav-container">
            <a href="/"><img className="logo" src="/img/logos/logo-bar-nav.jpg" alt="" /></a>
            <div className="nav-text-wrapper">
                <a href="/"><span className="text-navegation">Home</span></a>
                <a href="/products"><span className="text-navegation">Productos</span></a>
                <a href="/products/2/category" className="container-category">
                <span className="text-navegation-category"></span>
                </a>

                {!session ? (
                <a href="/user/register"><span className="text-navegation">Registro</span></a>
                ) : null}
            </div>

            <div className="nav-right-wrapper">
                <div className="div-user-header">
                <a href="/user" className="icon-account"><span className="material-symbols-outlined">account_circle</span></a>
                {session ? (
                    <>
                    <span className="name">¡Hola! {session.first_name}</span>
                    <a href="/user/logout"><i className="fa-solid fa-square-arrow-up-right"></i></a>
                    </>
                ) : null}
                </div>

                {session ? (
                <Link to="/products/create" className="add-product">
                    <span className="material-symbols-outlined">Create</span>
                </Link>
                ) : null}

                <section className="icon-shop-hamburguer">
                {session ? (
                    <div className="shop-icon">
                    <a href="/products/cart"><span className="material-symbols-outlined">local_mall</span></a>
                    <span className="number-shop"></span>
                    </div>
                ) : (
                    <div className="shop-icon">
                    <a href="/user/login"><span className="material-symbols-outlined">local_mall</span></a>
                    </div>
                )}

                <div className="contain-hamburguer">
                    <span className="material-symbols-outlined">menu</span>
                </div>
                </section>
            </div>
        </nav>
    );
  };
  
  export default NavBar;