const Footer = () => {

  return (
    <>
    <footer>
      <section className="footer-top-content">
        <div className="logo-footer-contain">
          <img src="/img/logos/logo-bottom.jpg" alt="" />
          <span className="text">Tienda ecológica</span>
        </div>

        <form action="/" method="GET" className="input-contain">
          <input type="search" name="search" />
          <button>Suscríbete</button>
        </form>
      </section>

      <article className="footer-bottom-content">
        <section className="compañia">
          <span className="title">COMPAÑIA</span>
          <ul>
            <li>Contacto</li>
            <li>Blog</li>
          </ul>
        </section>

        <section className="sitio">
          <span className="title">SITIO</span>
          <ul>
            <li>Tienda</li>
            <li>Inicio</li>
            <li>Contact Us</li>
          </ul>
        </section>

        <div className="content-contact-logo">
          <section className="contact">
            <span className="title">CONTACT US</span>
            <ul>
              <li>Calle#20-101</li>
              <li>(+57) 22 3444-2333</li>
              <li>TiendaEcologic@hotmail.com</li>
            </ul>
          </section>

          <div className="redes-sociales">
            <a href="https://github.com/Danielgbit/Grupo15_Tienda-Ecologic.git"><img src="/img/logos/logo-git.jpg" alt="" /></a>
            <a href=""><img src="/img/logos/logo-inst.jpg" alt="" /></a>
          </div>
        </div>
      </article>
    </footer>
    <p className="derechos">&copy; Todos los derechos reservados 2023 © Tienda Ecológica </p>
    </>
  );
};

export default Footer;
