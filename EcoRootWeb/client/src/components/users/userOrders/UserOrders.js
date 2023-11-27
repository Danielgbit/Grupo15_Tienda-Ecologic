import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DestroyOrder from './DestroyOrder';


const UserOrders = () => {

    const { id } = useParams();
    const [userOrders, setUserOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setDataUser] = useState();
  
    useEffect(() => {
      const fetchUserOrders = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/user/orders/${id}`);
          
          if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
          }

          
          const data = await response.json()
    console.log('data', data);
    ;
          setUserOrders(data.orders);
          setLoading(true);
        } catch (error) {
          console.error('Error al obtener órdenes del usuario:', error);
          setLoading(false);
        }
      };
  
      fetchUserOrders();
    }, [id]);

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


  
    
    if (!loading) {
        return (
          <p>loading</p>
        )
    }


    return (
      <div>
        {userOrders && userOrders.length > 0 ? (
          <div className="contain-orders-div Container-div-viewOrders">
            {userOrders.map((order) => (
              <div className="content-info-orders" key={order.order_id}>
                <div className="icon-order">
                  <i className="fa-solid fa-chalkboard-user"></i>
                  <DestroyOrder
                    orderId={order.order_id}
                  />
                </div>
                <h1>Orden: {order.order_id}</h1>
                <h1>Cantidad: {order.quantity}</h1>
                <p>Fecha: {new Date(order.order_date).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="title-order-products">Productos:</p>
                <ul>
                  {order.products.map((product) => (
                    <li className="product-contain-order" key={product.id}>
                      <p className="paragraph-product-prder">{product.name}</p>

                      {/* Agrega más detalles del producto según sea necesario */}
                    </li>
                  ))}
                </ul>
                <p>
                  <strong>Total: ${order.products.reduce((acc, product) => acc + Number(product.price), 0).toFixed(2)}</strong>
                </p>



                <p className="process-state-order"> <i className="fa-solid fa-location-pin"></i> Estado: En proceso </p>
              </div>
            ))}
            <div className="container-data-cartUser container-userData-order">
              <p className="cart-data-user-paragraph">Nombre: <span>{user && user.first_name ? user.first_name : null} {user && user.last_name ? user.last_name : null}</span></p>
              <p className="cart-data-user-paragraph">Pais: <span>{user && user.country ? user.country : null}</span></p>
              <p className="cart-data-user-paragraph">Ciudad: <span>{user && user.city ? user.city : null}</span></p>
              <p className="cart-data-user-paragraph">Domicilio: <span>{user && user.address ? user.address : null}</span></p>
            </div>
          </div>
        ) : (
          <div className='container-errors-empty'>
          <div className="error-container emptyCart-container">
              <img src="/img/ilustrations/CartEmpty.svg" alt="imagen de carrito vacío" />
                  <span>"Oops, parece que aún no has añadido ninguna orden"</span>
              <Link to="/products">¡Empieza a comprar!</Link>
          </div>
        </div>
        )}
        </div>
    );
};

export default UserOrders;