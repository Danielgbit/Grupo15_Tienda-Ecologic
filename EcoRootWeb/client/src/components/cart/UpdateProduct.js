import { useState } from "react";

const UpdateProduct = ({ productId, quantity, onUpdate  }) => {

    console.log('productIdUpdate', productId);

    const handleUpdate = async (action) => {

        console.log(action);
      try {
        const response = await fetch(`http://localhost:3000/api/user/productsInCart/update/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
          body: JSON.stringify({ action }), // Solo envía el action
        });
  
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }
  
        const updatedData = await response.json();
        console.log('Producto actualizado:', updatedData);



        if (onUpdate) {
            onUpdate(updatedData);
          }
        
                // Recarga la página después de la actualización
      window.location.reload();
      } catch (error) {
        console.error('Error al actualizar el producto en el carrito:', error);
      }
    };


  
    return (
      <form>
        <button onClick={() => handleUpdate('increment')} type="button">
          <i className="fa-solid fa-plus"></i>
        </button>
            <b className="cantidad-seleccionada">{quantity}</b>
        <button onClick={() => handleUpdate('decrement')} type="button">
          <i className="fa-solid fa-minus"></i>
        </button>
      </form>
    );
  };

export default UpdateProduct;
