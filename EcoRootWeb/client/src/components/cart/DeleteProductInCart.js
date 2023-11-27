import React from 'react';
import { useNavigate } from 'react-router-dom';

const DeleteProductInCart = ({ productId, user_id }) => {



  console.log('user_id', user_id );


  const handleDelete = async () => {
    try {
        const response = await fetch(`http://localhost:3000/api/user/productInCart/delete/${productId}`, {
            method: 'DELETE',
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: user_id,
            }),
          });
          


      if (!response.ok) {
        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
      }

      const deletedData = await response.json();
      console.log('Producto eliminado:', deletedData);

      window.location.reload();
      // Redirige a la página deseada después de la eliminación del producto
    } catch (error) {
      console.error('Error al eliminar el producto del carrito:', error);
    }
  };

  return (
    <button onClick={handleDelete}>
      <i className="fa-solid fa-trash-can-arrow-up"></i>
    </button>
  );
};

export default DeleteProductInCart;
