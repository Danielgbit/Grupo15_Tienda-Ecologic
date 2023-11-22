import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation  } from 'react-router-dom';
import DestroySession from '../users/userConfig/DestroySession';


const NavBar = () => {

    const navBarRef = useRef(null);

    useEffect(() => {
      const navBar = navBarRef.current;
      let prevScrollPos = window.pageYOffset;
  
      const handleScroll = () => {
        const currentScrollPos = window.pageYOffset;
  
        if (prevScrollPos < currentScrollPos && !navBar.classList.contains("navbar-hidden")) {
          navBar.classList.add("navbar-hidden");
        } else {
          navBar.classList.remove("navbar-hidden");
        }
  
        prevScrollPos = currentScrollPos;
      };
  
      window.addEventListener('scroll', handleScroll);
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [dataUser, setDataUser] = useState();
    const location = useLocation();


    useEffect(() => {
        const checkAuthentication = async () => {
          try {
            const response = await fetch('http://localhost:3000/api/check/authentication/user', {
              method: 'GET',
              credentials: 'include', // Incluye las cookies en la solicitud
            });
    
            if (!response.ok) {
              throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (data.success) {
                setDataUser(data.user)
                setIsLoggedIn(true);
            } else {
              setIsLoggedIn(false);
            }
          } catch (error) {
            console.error('Error al verificar la autenticación:', error);
          }
        };
    
        checkAuthentication();
      }, [location.pathname]);



  const [cartProducts, setCartProducts] = useState([]);
  const [cartLength, setCartLength] = useState(0);

      useEffect(() => {
        const productsInCart = async () => {
          try {
            if (!dataUser) {
              console.error('Usuario no definido');
              return;
            }
      
            const response = await fetch(`http://localhost:3000/api/user/productsInCart/${dataUser.user_id}`, {
              method: 'GET',
              credentials: 'include',
            });
      
            if (!response.ok) {
              throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            }
      
            const data = await response.json();
      
            if (!data) {
              console.error('Carrito vacío o respuesta no exitosa');
              return;
            }
      
            setCartProducts(data);
            setCartLength(data.userCartProducts.length);
      
          } catch (error) {
            console.error('Error al obtener productos en el carrito:', error);
          }
        };
      
        productsInCart();
      }, [dataUser]);
  
      console.log(cartLength);

      


    return (
        <nav ref={navBarRef} className="bar-nav-container">
            <Link to="/"><img className="logo" src="/img/logos/logo-bar-nav.jpg" alt="" /></Link>
            <div className="nav-text-wrapper">
                <Link to="/"><span className="text-navegation">Home</span></Link>
                <Link to="/products"><span className="text-navegation">Productos</span></Link>
{/*                 <a href="/products/2/category" className="container-category">
                    <span className="text-navegation-category"></span>
                </a> */}

                {!isLoggedIn ? (
                    <Link to="/user/register"><span className="text-navegation">Registro</span></Link>
                ) : null}
            </div>

            <div className="nav-right-wrapper">
                <div className="div-user-header">
                {isLoggedIn && (
                    <Link to="/user/config" className="icon-account">
                        <span className="material-symbols-outlined">account_circle</span>
                    </Link>
                )}
                {isLoggedIn && (
                    <>
                    <span className="name">¡Hola! {dataUser && dataUser.first_name}</span>
                        {/* //Component Destroy-Session-user */}
                        <DestroySession/>
                    </>
                )}
            </div>

                {isLoggedIn && (
                    <Link to="/products/create" className="add-product">
                        <span ><i class="fa-solid fa-plus"></i></span>
                    </Link>
                )}

                <section className="icon-shop-hamburguer">
                {isLoggedIn && (
                    <div className="shop-icon">
                        <Link to={`/user/${dataUser && dataUser.user_id}/productsInCart`}><span className="material-symbols-outlined">local_mall</span></Link>
                        <span className="number-shop">{cartLength && cartLength }</span>
                    </div>
                )}
              
                {!isLoggedIn && (
                    <div className="shop-icon">
                        <Link to="/user/login">Login</Link>
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