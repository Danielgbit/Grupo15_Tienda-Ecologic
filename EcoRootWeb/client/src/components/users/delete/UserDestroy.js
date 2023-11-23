import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserDestroy = ({ userId }) => {

    const navigate = useNavigate();

    console.log('userId', userId);

  const handleDelete = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/user/delete/${userId && userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Aquí puedes agregar cualquier otro encabezado necesario, como tokens de autenticación, si es necesario
        },
      });

      if (!response.ok) {
        throw new Error(`Error al intentar eliminar el usuario: ${response.status} - ${response.statusText}`);
      }


      navigate('/')
      window.location.reload();


      // Si todo está bien, puedes manejar la respuesta aquí
      console.log('Usuario eliminado con éxito');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <button className="button-delete-user buttons-user" onClick={handleDelete}>
      <i className="fa-solid fa-user-xmark"></i>Eliminar cuenta
    </button>
  );
};

export default UserDestroy;
