
import { Link } from 'react-router-dom';

const ProductList = ({ allProducts }) => {

  return (
    <>
    {allProducts.map(product => (
        <Link to={`/product/detail/${product.product_id}`} className="product-card" key={product.product_id}>
              <section className="card">
                <img src={`http://localhost:3000${product.image}`} alt="imagen del producto" />
                <div className="content-card-container">
                  <section className="contain-content-card-1">
                    <div className="description">
                      <span>{product.name}</span>
                      <p>Ref: <span>{product.product_id}</span></p>
                      <p> Categoria: <span>{product.productCategory.category_name}</span></p>
                    </div>
                    <div className="stars">
                      <span className="material-symbols-outlined">star</span>
                      <span className="material-symbols-outlined">star</span>
                      <span className="material-symbols-outlined">star</span>
                      <span className="material-symbols-outlined">star</span>
                      <span className="material-symbols-outlined">star</span>
                    </div>
                  </section>

                  <section className="contain-content-card-2">
                    <form method="POST" action="/products/addToCart">
                      <input type="hidden" name="product_id" value={product.product_id} />
                      <a>
                        <input type="hidden" name="quantity" value="1" min="1" max="1" />
                        <button type="submit" className="button"><span className="material-symbols-outlined">add_shopping_cart</span></button>
                      </a>
                    </form>
                    <div className="price">
                      {product.discount === '0.00' ? (
                        <span></span>
                      ) : (
                        <span className="descuento">{product.discount}% OFF</span>
                      )}
                      <span className="total">$ {product.price}</span>
                    </div>
                  </section>
                </div>
              </section>
          </Link> 
          ))}
    </>
  );
};

export default ProductList;
