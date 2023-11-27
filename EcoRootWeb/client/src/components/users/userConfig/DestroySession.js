import { useNavigate } from 'react-router-dom';

const DestroySession = () => {

  const navigate = useNavigate();

    const handleLogout = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/destroy/session', {
          method: 'POST',
          credentials: 'include',
        });
  
        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }
  
        const data = await response.json();
  
        if (data.success) {
          console.log(data);
          console.log('Sesión cerrada exitosamente');
          navigate('/');
          window.location.reload(); // Esto recargará la página
        } else {
          console.error('Error al cerrar la sesión:', data.error);
        }
      } catch (error) {
        console.error('Error al cerrar la sesión:', error);
      }
    };
  

    return (
        <a onClick={handleLogout} className='item-user-header'>
            <i className="fa-solid fa-square-arrow-up-right"></i>
        </a>
    )
};

export default DestroySession;