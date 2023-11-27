import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductList from "../../products/productsItemsList/ProductList";

const UserProducts = () => {

    const { id } = useParams();
    const [userProducts, setUserProducts] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchUserProducts = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/user/products/${id}`);
          
          if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
          }
  
          const data = await response.json();
          setUserProducts(data.products);
          setLoading(false);
        } catch (error) {
          console.error('Error al obtener productos del usuario:', error);
          setLoading(false);
        }
      };
  
      fetchUserProducts();
    }, [id]);

    console.log(userProducts);
  
    if (loading) {
      return <p>Cargando productos...</p>;
    }

    return(

            <div className='container-allProducts-div'>
                <main>

                <section className="paragraph-head-main">
                    <img src="/img/backgrounds/img-plants-flyer.jpg" alt=""/>
                    <p>Descubre una amplia gama de productos conscientes con el medio ambiente que te permitirán vivir de forma
                        más sostenible.</p>
                </section>

                <article className="main-products-category-container">

                    <div className="container-name-category-cards">

                        <section className="seccion-category-name">
                            <div className="title-categoty-product-contain">
                                <span>Mis productos</span>
                            </div>

                        </section>


                        <article id="cards-products-container">
                            <ProductList allProducts={userProducts}/>
                        </article>


                    </div>

                </article>


                </main>
            </div>

        
    )
};

export default UserProducts;