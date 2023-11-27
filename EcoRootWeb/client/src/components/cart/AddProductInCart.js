import { useState, useEffect } from "react";
import axios from 'axios';

const AddProductInCart = ({product_id}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dataUser, setDataUser] = useState();
  const [formValues, setFormValues] = useState({
    product_id: product_id,
    quantity: 1,
    user_id: undefined,
  });

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/check/authentication/user', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();

        if (data.success) {
          setDataUser(data.user);
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error al verificar la autenticación:', error);
      }
    };

    checkAuthentication();
  }, [product_id]);

  useEffect(() => {
    // Set formValues here to ensure user_id is available
    if (dataUser && dataUser.user_id !== undefined) {
      setFormValues({
        product_id: product_id,
        quantity: 1,
        user_id: dataUser.user_id,
      });
    }
  }, [dataUser, product_id]);


  const handleSubmit = async () => {
    try {
      const response = await axios.post(`http://localhost:3000/api/user/addProductCart/${dataUser.user_id}`, formValues);
      console.log(response);
      window.location.reload();

    } catch (error) {
      console.error(error);
    }
  };

    return(
        <a> 
          <button type="submit" onClick={handleSubmit} className="button">
            <span className="material-symbols-outlined">add_shopping_cart</span>
          </button> 
        </a>
    )
};

export default AddProductInCart;