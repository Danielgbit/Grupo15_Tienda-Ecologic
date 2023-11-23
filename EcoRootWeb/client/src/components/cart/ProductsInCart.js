import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import UpdateProduct from './UpdateProduct';
import DeleteProductInCart from './DeleteProductInCart';
import CreateOrder from '../users/userOrders/CreateOrder';

const ProductsInCart = () => {

  const { id } = useParams();
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setDataUser] = useState();
  const [totalPrice, setTotalPrice] = useState(0);


  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/check/authentication/user', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success) {
          setDataUser(data.user);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error al verificar la autenticación:', error);
      }
    };

    checkAuthentication();
  }, [id]);


  const handleUpdateInParent = (updatedData) => {
    const updatedCartProducts = cartProducts.userCartProducts.map((product) => {
      if (product.productsInCart.product_id === updatedData.product_id) {
        return {
          ...product,
          productsInCart: {
            ...product.productsInCart,
            quantity: updatedData.quantity,
            // Puedes agregar más propiedades actualizadas aquí según sea necesario
          },
        };
      }
      return product;
    });

    setCartProducts({
      ...cartProducts,
      userCartProducts: updatedCartProducts,
    });

    const total = updatedCartProducts.reduce(
      (accumulator, product) =>
        accumulator + product.productsInCart.price * product.productsInCart.quantity,
      0
    );

    setTotalPrice(total);
  };



  useEffect(() => {
    const productsInCart = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/user/productsInCart/${id}`, {
          method: 'GET',
          credentials: 'include', // Incluye las cookies en la solicitud
        });

        
        const data = await response.json();
        
        if (!data.success) {
          console.error('carrito vacio');
        }
        
        setCartProducts(data)

              // Calcula el total de todos los productos
        const total = data.userCartProducts.reduce(
          (accumulator, product) =>
            accumulator + product.productsInCart.price * product.productsInCart.quantity,
          0
        );

        setTotalPrice(total);

      } catch (error) {
        console.error('Error al verificar la autenticación:', error);
      }
    };

    productsInCart();
  }, []);





  if (cartProducts.length === 0 || !cartProducts.userCartProducts ) {
    return (
      <>
          <div className='container-errors-empty'>
              <div className="error-container emptyCart-container">
                    <img src="/img/ilustrations/CartEmpty.svg" alt="imagen de carrito vacío" />
                        <span>"Oops, Tu carrito esta vacio"</span>
                    <Link to="/products">¡Empieza a comprar!</Link>
                </div>
            </div>
      </>
    )
  }



  return (

    
    <main className='container-main-productInCart'>
      <article className="article-container">
        <div className="container-cards-checkout">
          {cartProducts && cartProducts.userCartProducts.map(product => (
            <section className="content-article" key={product.productsInCart.product_id}>
              <img src={`http://localhost:3000${product.productsInCart.image}`} alt="Imagen producto" />
              <div className="quantity-prod">
                <div className="content-title">
                  <DeleteProductInCart
                    productId={product.productsInCart.product_id}
                    user_id={user && user.user_id}
                  />
                  <b className="titulo-producto">{product.productsInCart.name}</b>
                </div>
                <div className="content-price-arrows">
                    <UpdateProduct
                      cartProducts={cartProducts}
                      productId={product.productsInCart.product_id}
                      quantity={product.productsInCart.quantity}
                      onUpdate={(updatedData) => handleUpdateInParent(updatedData)}
                    />
                  <b className="price"> X </b>
                  <b className="price"> $ {(product.productsInCart.price * product.productsInCart.quantity).toFixed(2)} </b>
                </div>
              </div>
            </section>
          ))}


          <div className="monto-total-compra">
            <p>TOTAL: $ {totalPrice.toFixed(2)}</p>
          </div>
        </div>
        <section className="data-container">
          <div className="data-entry-box">
            <div className="contain-info-user-cart">
              <span>Informacion de compra</span>
              <img src={`http://localhost:3000/api/user/avatar/${user && user.user_id}`} alt="Foto de Perfil" className="profile-pic" />
            </div>
            <div className="container-data-cartUser">
              <p className="cart-data-user-paragraph">Nombre: <span>{user && user.first_name ? user.first_name : null} {user && user.last_name ? user.last_name : null}</span></p>
              <p className="cart-data-user-paragraph">Pais: <span>{user && user.country ? user.country : null}</span></p>
              <p className="cart-data-user-paragraph">Ciudad: <span>{user && user.city ? user.city : null}</span></p>
              <p className="cart-data-user-paragraph">Domicilio: <span>{user && user.address ? user.address : null}</span></p>
            </div>
            <div className="button-contain-checkout">
              <CreateOrder
                user_id={user.user_id}
                totalPrice={totalPrice}
              />
            </div>
          </div>
        </section>
      </article>
    </main>
  );
};

export default ProductsInCart;