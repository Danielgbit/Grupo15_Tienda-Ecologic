import RegisterForm from "./RegisterForm";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from 'react-router-dom';


const ContainerRegisterUser = () => {

    //GET API-COUNTRIES
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch('https://restcountries.com/v3.1/all');
            if (!response.ok) {
              throw new Error('Error al obtener datos');
            }
            const data = await response.json();
            // Extraer solo los nombres de los países
            const countryNames = data.map(country => country.name.common);
            setCountries(countryNames);
          } catch (error) {
            console.error('Error:', error);
          }
        };
    
        fetchData();
      }, []);


      const [isLoggedIn, setIsLoggedIn] = useState(false);
      const [dataUser, setDataUser] = useState();
      const navigate = useNavigate();
      useEffect(() => {


          const checkAuthentication = async () => {
            try {
              const response = await fetch('http://localhost:3000/api/check/authentication/user', {
                method: 'GET',
                credentials: 'include', // Incluye las cookies en la solicitud
              });
      
              if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
              }
              
              const data = await response.json();
              
              if (data.success) {
                  setDataUser(data.user)
                  setIsLoggedIn(true);
              } else {
                setIsLoggedIn(false);
              }
            } catch (error) {
              console.error('Error al verificar la autenticación:', error);
            }
          };
      
          checkAuthentication();
        }, []);

        if (isLoggedIn) {
  
          navigate('/')
        };



    return(
        <>
         <RegisterForm
            countries={countries}
         />
        </>
    )
}

export default ContainerRegisterUser;