import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';


const UserOrders = () => {

    const { id } = useParams();
    const [userOrders, setUserOrders] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUserOrders = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/user/orders/${id}`);
          
          if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
          }
  
          const data = await response.json();
          setUserOrders(data);
          setLoading(false);
        } catch (error) {
          console.error('Error al obtener órdenes del usuario:', error);
          setLoading(false);
        }
      };
  
      fetchUserOrders();
    }, [id]);


    console.log(userOrders);
  
    if (loading) {
      return <p>Cargando órdenes...</p>;
    }

    if (!loading) {
        return (
            <div className='container-errors-empty'>
                <div className="error-container emptyCart-container">
                    <img src="/img/ilustrations/CartEmpty.svg" alt="imagen de carrito vacío" />
                        <span>"Oops, parece que aún no has añadido ninguna orden"</span>
                    <Link to="/products">¡Empieza a comprar!</Link>
                </div>
            </div>
        )
    }

    return(
        <>
        </>
    )
};

export default UserOrders;