import { Link } from 'react-router-dom';


const Home = () => {
    


    return (
        <div className="container-main-home" >
            <main>
                <section className="seccion-top-carrousel">
                    <div className="img-top-body-container">
                        <img src="/img/home/img-cepillo-bambu.jpg" alt="" />
                    </div>
                    <p>
                        "¡Bienvenido a Ecoroot, el lugar donde florece la belleza ecológica para tu cuerpo y más allá! Sumérgete en un oasis de productos cuidadosamente seleccionados, inspirados en la naturaleza y creados con un profundo respeto por nuestro planeta."
                    </p>
                </section>

                <section className="seccion-main-products">
                    <div className="text-products-wrapper">
                        <h1>Productos mas vendidos</h1>
                        <p>
                            "¡Descubre nuestros productos estrella, los favoritos de nuestros clientes comprometidos con el medio ambiente! Explora nuestra selección de productos más vendidos, desde bolsas reutilizables hasta velas ecológicas y mucho más. Únete a la tendencia sostenible y elige los productos que marcan la diferencia. ¡No te pierdas lo más popular en nuestra tienda virtual ecoamigable!"
                        </p>
                    </div>

                    <a className="button-shop-home" href="/products">
                    <button className="button-shop-home-primary" type="submit">
                        Ingresa a la tienda<span className="material-symbols-outlined">local_mall</span>
                    </button>
                    </a>
                </section>

                <article id="cards-products-container"></article>

                <article className="articles-contain">
                    <div className="title-article-contain">
                        <h2>Elementos que aportan al cambio</h2>
                        <span className="material-symbols-outlined">eco</span>
                    </div>

                    <div className="articles-cards-contain">
                    <section className="card-article-contain">
                        <img src="/img/home/img-tonic.jpg" alt="" />
                        <div className="text-article-wrapper">
                        <span className="title">Tonico</span>
                        <p className="parrafo">Lorem ipsum dolor sit amet consectetur. Tortor urna egestas mauris enim. Id dui lobortis vulputate sed in.</p>
                        </div>
                    </section>

                    <section className="card-article-contain">
                        <img src="/img/home/img-crem-ecologic.jpg" alt="" />
                        <div className="text-article-wrapper">
                        <span className="title">Crema ecologica</span>
                        <p className="parrafo">Lorem ipsum dolor sit amet consectetur. Tortor urna egestas mauris enim. Id dui lobortis vulputate sed in.</p>
                        </div>
                    </section>

                    <section className="card-article-contain">
                        <img src="/img/home/img-brush.jpg" alt="" />
                        <div className="text-article-wrapper">
                        <span className="title">Cepillo bambu</span>
                        <p className="parrafo">Lorem ipsum dolor sit amet consectetur. Tortor urna egestas mauris enim. Id dui lobortis vulputate sed in.</p>
                        </div>
                    </section>

                    <section className="card-article-contain">
                        <img src="/img/home/img-jabon-ecologic.jpg" alt="" />
                        <div className="text-article-wrapper">
                        <span className="title">Jabon biodegradable</span>
                        <p className="parrafo">Lorem ipsum dolor sit amet consectetur. Tortor urna egestas mauris enim. Id dui lobortis vulputate sed in.</p>
                        </div>
                    </section>
                    </div>
                </article>

                <section className="seccion-promotion-contain">
                    <img src="img/home/img-cepillo-bambu.jpg" alt="" />
                    <div className="content-promotion">
                    <div className="text-promotion">
                        <h3>Cepillo de bambú</h3>
                        <p>"¡Sonríe al futuro con nuestros cepillos de bambú! Cuidar de tu higiene bucal nunca fue tan ecológico y elegante. Hechos con materiales renovables y biodegradables, nuestros cepillos de bambú te brindan una experiencia única, combinando la suavidad de las cerdas de nylon de alta calidad con el impacto positivo en el medio ambiente. ¡Únete a la revolución del cepillado sostenible y dale a tu sonrisa un toque natural!"</p>
                    </div>
                    <Link to="/products">
                        <button className="button-promotion">
                            Ingresa a la tienda<span className="material-symbols-outlined">local_mall</span>
                        </button>
                    </Link>
                    </div>
                </section>

                <section className="seccion-login-message">
                    <img src="/img/home/img-shop.jpg" alt="" />
                    <div className="content-login-message">
                    <div className="text-promotion">
                        <p>"¡Descubre una experiencia de compra ecoamigable en nuestra tienda virtual! Convierte tus compras en acciones positivas para el planeta, explorando nuestra amplia selección de productos ecológicos que te ayudarán a cuidar el medio ambiente mientras disfrutas de la calidad y estilo que deseas. ¡Únete a nosotros y hagamos juntos un cambio sostenible!"</p>
                    </div>
                    <Link to="/user/login">
                        <button className="button-promotion">
                        Inicia sesión<span className="material-symbols-outlined">arrow_right_alt</span>
                        </button>
                    </Link>
                    </div>
                </section>
                </main>

        </div>
    );
  };
  
  export default Home;