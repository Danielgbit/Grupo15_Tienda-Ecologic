import ProductUpdateForm from "./ProductUpdateForm";
import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';



const ContainerUpdateProduct = () => {

        const { id } = useParams();
        const [getProductEdit, setGetProductEdit] = useState([]);

          // GET-PRODUCT-EDIT
          useEffect(() => {
            const fetchData = async () => {
                try {
                    const response = await fetch(`http://localhost:3000/api/product/getEdit/${id}`);
        
                    if (!response.ok) {
                        throw new Error('La respuesta no fue exitosa');
                    }
        
                    const data = await response.json();
                    setGetProductEdit(data);
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
        
            fetchData();
        }, [id]);



    return (
        <>
          {<ProductUpdateForm 
                brands={getProductEdit.brands} 
                categories={getProductEdit.category}
                colors={getProductEdit.colors} 
                productData={getProductEdit.product}
            />}
        </>
    );
  };
  
  export default ContainerUpdateProduct;
  