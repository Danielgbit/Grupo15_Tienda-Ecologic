import React from 'react';
import { useNavigate } from 'react-router-dom';

const CreateOrder = ({ totalPrice, user_id }) => {

  const navigate = useNavigate();
  
  const handleCheckout = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/order/create/${user_id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }

      console.log('response', response);

      const orderData = await response.json();
      console.log('Orden creada:', orderData);
      navigate(`/user/${user_id}/orders`);

    } catch (error) {
      console.error('Error al crear la orden:', error);
    }
  };

  return (
    <form onSubmit={handleCheckout}>
      <button type="submit" className="pay-button">
        <p>TOTAL: $ {totalPrice && totalPrice.toFixed(2)}</p>
        <p>CHECKOUT</p>
      </button>
    </form>
  );
};

export default CreateOrder;
