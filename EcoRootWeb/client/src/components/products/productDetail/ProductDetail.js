import { Link } from 'react-router-dom';
import DestroyProductComponent from '../mainProduct/Delete/DestroyProductComponent';
import { useEffect, useState } from 'react';

const ProductDetail = ({ product }) => {


    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setDataUser] = useState();

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
    }, []);

    
    if (!product) {
        return <p>No hay detalle de producto</p>;
    };

    return (
        product &&
            <main className='container-main-product-detail'>
                <section id="main-productDetail">
                    <article className="top-product-detail-container">
                    <div className="img-card-val-wrapper">
                        <img className="img-primary" src={`http://localhost:3000${product.image}`} alt="imagen del producto" />
                        <div className="imgs-card-val-carrousel-wrapper">
                        </div>
                    </div>
                    <section className="contain-right-detail-content">
                        <div className="title-1-detail-container">
                            <h1 className="title-1-product-detail">{product.name}</h1>

                        {isLoggedIn &&
                                <div className="button-actions-detail">
                                    {/*  //EditProduct-LINK*/}
                                    <Link className='link-edit-product' to={`/product/edit/${product.product_id}`}><i className="fa-solid fa-pencil"></i></Link>
                                    {/*  //DestroyComponent */}
                                    <DestroyProductComponent id={product.product_id}/>
                                </div>
                            }
                        </div>
                        <article className="content-text-detail">
                            <p>{product.description}</p>
                            <div className="brand-container">
                                <span> Categoria: <p>{product.category_name}</p></span>
                            </div>
                            <div className="brand-container">
                                <span> Marca: <p>{product.productBrand}</p></span>
                            </div>
                        </article>

                        <div className="price-detail-wrapper">
                            {product.discount === '0.00' ? <span></span> : <span className="descuento">{parseInt(product.discount)}% OFF</span>}
                            <span className="price"> $ {product.price}</span>
                        </div>
                        <div className="buttons-detail-container">
                            <div className="button-selector-detail button-detail-2">
                                <span className='span-material'>Material:</span>
                                <p>{product.material}</p>
                            </div>
                            <div className="button-cart-add-detail">
                                <button>AGREGAR AL CART</button>
                                <span>{product.united}</span>
                            </div>
                        </div>
                    </section>
                    </article>
                </section>
            </main>
    );
  };
  
  export default  ProductDetail;