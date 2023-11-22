import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import { Navigate } from 'react-router-dom';

const ContainerLoginUser = () => {

    const [userData, setUserData] = useState(null);
    const [apiErrors, setApiErrors] = useState([]);
    const [dataError, setDataError] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);

    

    const handleFormSubmit = (data) => {
        setUserData(data);
      };

      useEffect(() => {
        const sendPostRequest = async () => {
          console.log('Cookies:', document.cookie);
          try {
            const response = await fetch('http://localhost:3000/api/user/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include', // Importante: incluir las cookies en la solicitud COOKIES Y SESSION
              body: JSON.stringify(userData),
            });

    

            if (!response.ok) {
                const errorData = await response.json();
                // Actualiza el estado con los errores de la API
                setApiErrors(errorData.errors || []);
                console.error('Error en la solicitud:', errorData.errors);
                return;
            }

            const data = await response.json();


            if (data.success === true) {
                console.log('Usuario ingresó éxitosamente');
                setDataError([]);
                setLoggedIn(true);  // Establece el estado loggedIn a true
            } else {

                setDataError(data.error)
                console.error('Error en el mensaje de la API:', data.error);
            }

          } catch (error) {
                console.error('Error:', error);
          }
        };
    
        if (userData) {
          setApiErrors([]);
          sendPostRequest();
        }
      }, [userData]);

      if (loggedIn) {
        // Redirecciona al usuario después del inicio de sesión exitoso
        return <Navigate to="/" />;
      }

    return(
        <>
            <LoginForm
                onSubmitForm={handleFormSubmit}
                errorsLogin={apiErrors}
                inputDataError={dataError}
            />
        </>
    )
}

export default ContainerLoginUser;