import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DestroyProductComponent = ({ id }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();
  
  const handleDelete = async () => {

    setIsDeleting(true);
  
    try {
      const response = await fetch(`http://localhost:3000/api/product/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log(response);
  
      if (!response.ok) {
        throw new Error('Error al eliminar el producto');
      }


      navigate('/products');
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      setIsDeleting(false);
    }
  };
  

  return (
      <button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting ? 'Eliminando...' : <i className="fa-solid fa-trash"></i>}
      </button>
  );
};

export default DestroyProductComponent;
