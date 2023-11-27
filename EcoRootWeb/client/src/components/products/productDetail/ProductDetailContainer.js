
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductDetail from './ProductDetail';

const ProductDetailContainer = () => {

    const { id } = useParams();
    const [productDetail, setProductDetail] = useState([]);

      // PRODUCT-DETAIL
        useEffect(() => {
            const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/product/detail/${id}`);
                
                if (!response) {
                throw new Error('La respuesta no fue exitosa');
                }

                const data = await response.json();
                setProductDetail(data.product);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
            };

            fetchData();
        }, []);


    return (
        <>
            <ProductDetail product={productDetail}/>
        </>
    );
  };
  
  export default  ProductDetailContainer;