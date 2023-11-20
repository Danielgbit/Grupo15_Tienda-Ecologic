import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


const NavBar = () => {
    
    const [session, setSession] = useState([]);

    useEffect(() => {
        setSession([]);
    }, []);


    return (
        <nav className="bar-nav-container">
            <Link to="/"><img className="logo" src="/img/logos/logo-bar-nav.jpg" alt="" /></Link>
            <div className="nav-text-wrapper">
                <Link to="/"><span className="text-navegation">Home</span></Link>
                <Link to="/products"><span className="text-navegation">Productos</span></Link>
{/*                 <a href="/products/2/category" className="container-category">
                    <span className="text-navegation-category"></span>
                </a> */}

                {!session ? (
                    <a href="/user/register"><span className="text-navegation">Registro</span></a>
                ) : null}
            </div>

            <div className="nav-right-wrapper">
                <div className="div-user-header">
                <Link to="/user/config" className="icon-account">
                    <span className="material-symbols-outlined">account_circle</span>
                </Link>
                {session ? (
                    <>
                    <span className="name">¡Hola! {session.first_name}</span>
                    <a className='item-user-header' href="/user/logout"><i className="fa-solid fa-square-arrow-up-right"></i></a>
                    </>
                ) : null}
            </div>

                {session ? (
                    <Link to="/products/create" className="add-product">
                        <span ><i class="fa-solid fa-plus"></i></span>
                    </Link>
                ) : null}

                <section className="icon-shop-hamburguer">
{/*                 {session ? (
                    <div className="shop-icon">
                        <a href="/products/cart"><span className="material-symbols-outlined">local_mall</span></a>
                        <span className="number-shop"></span>
                    </div>
                ) : (
                )} */}

                    <div className="shop-icon">
                        <Link to="/user/login">Login</Link>
                    </div>
                    <div className="contain-hamburguer">
                        <span className="material-symbols-outlined">menu</span>
                    </div>
                </section>
            </div>
        </nav>
    );
  };
  
  export default NavBar;