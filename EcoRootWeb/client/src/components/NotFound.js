import { Link } from "react-router-dom";

const NotFound = () => {

    return (
        <div className="error-container">
            <img src="/img/error/404.svg" alt="imagen de error 404" />
            <span>"Oops, parece que te has perdido en el ciberespacio. ¡Vamos a llevarte de vuelta a casa!"</span>
            <Link to="/">Vuelve a casa</Link>
        </div>

    )
};


export default NotFound;