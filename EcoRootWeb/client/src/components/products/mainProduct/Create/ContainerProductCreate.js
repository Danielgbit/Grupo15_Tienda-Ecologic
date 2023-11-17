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


    //POST PRODUCT-CREATE

    const [productData, setProductData] = useState(null);
    const [apiErrors, setApiErrors] = useState([]);

    const handleFormSubmit = (data) => {
      setProductData(data);
    };
  
    useEffect(() => {
      const sendPostRequest = async () => {
        try {
          const response = await fetch('http://localhost:3000/api/product/create', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(productData),
          });
  
          if (!response.ok) {
            const errorData = await response.json();
            // Actualiza el estado con los errores de la API
            setApiErrors(errorData.errors || []);
            throw new Error('Error al crear el producto');
          }
  
          console.log('Producto creado con éxito:', productData);
          // Realiza la lógica adicional después de crear el producto
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      if (productData) {
        setApiErrors([]);
        sendPostRequest();
      }
    }, [productData]);


    console.log(apiErrors);


    return (
        <>
            <ProductCreateForm
                errors = {apiErrors}
                onSubmitForm={handleFormSubmit}
                category = {getDataProductCreate.category}
                brands = {getDataProductCreate.brands}
                colors = {getDataProductCreate.colors}
            />
        </>
    );
  };
  
  export default ContainerProductCreate;
  