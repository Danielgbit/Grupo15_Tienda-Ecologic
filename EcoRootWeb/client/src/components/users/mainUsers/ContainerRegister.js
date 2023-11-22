import RegisterForm from "./RegisterForm";
import { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';


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




    return(
        <>
         <RegisterForm
            countries={countries}
         />
        </>
    )
}

export default ContainerRegisterUser;