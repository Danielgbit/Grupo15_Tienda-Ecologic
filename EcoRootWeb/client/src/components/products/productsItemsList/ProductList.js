
import { Link } from 'react-router-dom';
import AddProductInCart from '../../cart/AddProductInCart';

const ProductList = ({ allProducts }) => {




  if (!allProducts) {
    return (
      <span>No hay productos disponibles</span>
    )
  }


  return (
    <>
      {allProducts && allProducts.map(product => (
        <section className="card" key={product.product_id}>
          <Link to={`/product/detail/${product.product_id}`} className="product-card">
            <img src={`http://localhost:3000${product.image}`} alt="imagen del producto" />
            <div className="content-card-container">
              <section className="contain-content-card-1">
                <div className="description">
                  <span>{product.name}</span>
                  <p>Ref: <span>{product.product_id}</span></p>
                  <p> Categoria: <span>{product.productCategory?.category_name || product.category_name}</span></p>
                </div>
                <div className="stars">
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                  <span className="material-symbols-outlined">star</span>
                </div>
              </section>
            </div>
          </Link> 
  
          <section className="contain-content-card-2">
            <AddProductInCart
              product_id={product.product_id}
            />
            <div className="price">
              {product.discount === '0.00' ? (
                <span></span>
              ) : (
                <span className="descuento">{parseInt(product.discount)}% OFF</span>
              )}
              <span className="total">$ {product.price}</span>
            </div>
          </section>
        </section>
      ))}
    </>
  );
  
};

export default ProductList;
