import React, { useEffect, useState } from 'react';
import ProductCreateForm from './ProductCreateForm';

const ContainerProductCreate = () => {

    const [getDataProductCreate, setGetDataProductCreate] = useState([]);

    //GET DATA PRODUCT-CREATE
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/product/create`);

                if (!response.ok) {
                    throw new Error('La respuesta no fue exitosa');
                }

                const data = await response.json();
                setGetDataProductCreate(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);



    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [dataUser, setDataUser] = useState();


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



    return (
        <>
            <ProductCreateForm
                user = {dataUser}
                category = {getDataProductCreate.category}
                brands = {getDataProductCreate.brands}
                colors = {getDataProductCreate.colors}
            />
        </>
    );
  };
  
  export default ContainerProductCreate;
  