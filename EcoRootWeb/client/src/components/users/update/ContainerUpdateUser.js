import UserUpdate from "./UserUpdate";
import { useEffect, useState } from "react";
import { useParams, Navigate } from 'react-router-dom';




const ContainerUserUpdate = () => {

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


          const { id } = useParams();
          const [userData, setUserData] = useState(null);



          //GET API USER-DETAIL

          useEffect(() => {
            const fetchUserData = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/api/user/${id}`, {
                        method: 'GET',
                        credentials: 'include', // Incluye las cookies en la solicitud si es necesario
                    });
    
                    if (!response.ok) {
                        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
                    }
    
                    const data = await response.json();
                    setUserData(data.user);
                } catch (error) {
                    console.error('Error al obtener los detalles del usuario:', error);
                }
            };
    
            fetchUserData();
        }, [id]);


        


    if (!userData) {
        return <div>Cargando...</div>;
    }


    
    return (
        <UserUpdate
            userData={userData}
            countries={countries}
        />
    )

};

export default ContainerUserUpdate;