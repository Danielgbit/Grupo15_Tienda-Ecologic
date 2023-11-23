// En tu componente CategoryProducts (CategoryProducts.js)
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductList from '../products/productsItemsList/ProductList';
import ProductsFiltered from '../products/productsItemsList/ProductsFiltered';

const CategoryProducts = () => {

    const { categoryId } = useParams();

const [searchQuery, setSearchQuery] = useState('');
const [filteredProducts, setFilteredProducts] = useState([])
      // FILTEREDPRODUCTS
  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/product/search?query=${searchQuery}`);
        if (!response.ok) {
          throw new Error('La respuesta no fue exitosa');
        }

        const data = await response.json();
        setFilteredProducts(data.products);
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
    };

    // Realizar la búsqueda solo si hay un valor en searchQuery
    if (searchQuery.trim() !== '') {
      fetchSearchResults();
    } else {
      // Si el campo de búsqueda está vacío, puedes manejarlo como desees
      setFilteredProducts([]);
    }
  }, [searchQuery]); // El efecto se ejecutará cada vez que searchQuery cambie
  const { categoryName } = useParams();


//CATEGORY PRODUCTS




const [products, setProducts] = useState([]);

useEffect(() => {
  const fetchCategoryProducts = async () => {
    try {
      const response = await fetch(`http://localhost:3000/api/product/categories/${categoryId}`);
      const data = await response.json();

      // Suponiendo que la API devuelve un arreglo de productos para la categoría específica
      const categoryProducts = data.productsByCategory || [];

      setProducts(categoryProducts);
    } catch (error) {
      console.error('Error al obtener los productos de la categoría:', error);
    }
  };

  fetchCategoryProducts();
}, [categoryId]); // El segundo parámetro [categoryId] significa que useEffect se ejecutará cada vez que cambie categoryId



if (categoryId === 'null') {
    return (
          <div className="error-container emptyCart-container container-errors-empty">
            <img src="/img/ilustrations/CartEmpty.svg" alt="imagen de carrito vacío" />
            <span>"Actualmente no hay productos en esta categoria"</span>
        </div>
    );
  }


  


  return (
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
                        <span>Todos los productos</span>
                    </div>

                    <form method="get" className="form-product-search">
                        <div  className="input-search-product-contain">
                            <input onChange={handleInputChange} value={searchQuery} type="search" id="search" name="search" placeholder="Busca un producto"/>
                            <button type="submit">Buscador</button>
                        </div>
                    </form>
                </section>



                <article id="cards-products-container">
                  {searchQuery.trim() !== '' ? (
                    <ProductsFiltered filteredProducts={filteredProducts} />
                  ) : (
                    <ProductList allProducts={products && products}/>
                  )}
                </article>


            </div>

        </article>


        </main>
    </div>
  );
};

export default CategoryProducts;