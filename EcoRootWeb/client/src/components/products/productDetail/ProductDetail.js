import { Link } from 'react-router-dom';
import DestroyProductComponent from '../mainProduct/Delete/DestroyProductComponent';

const ProductDetail = ({ product }) => {

    
    if (!product) {
        return <p>No hay detalle de producto</p>;
    };

    return (
        product &&
        <div>
            <main>
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
                                <div className="button-actions-detail">
                                    {/*  //EditProduct-LINK*/}
                                    <Link to={`/product/edit/${product.product_id}`}><i className="fa-solid fa-pencil"></i></Link>
                                    {/*  //DestroyComponent */}
                                    <DestroyProductComponent id={product.product_id}/>
                                </div>
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
                                <button>{product.material}</button>
                                <span>Material</span>
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
        </div>
    );
  };
  
  export default  ProductDetail;