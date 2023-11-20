import { Link } from "react-router-dom";

const UserConfig = ({locals, user}) => {
    return(
        <div className="body-userpage">
            <main>
                <div className="container-user-div">
                    <h1>¡Bienvenido a configuración de usuario!</h1>
                    <div className="div-container-user-content-max">
                        <div className="div-info-user-head-container">
                            {locals && locals.user && locals.user.email && (
                                <h2>¡Hola! {user && user.first_name} {user && user.last_name}</h2>
                            )}

                            {locals && locals.user && locals.user.avatar && (
                                <img className="img-user-page" src={`/img/avatars/${user.avatar}`} alt="foto de perfil" />
                            )}

                            <form action={`/user/${user && user.user_id}/delete?_method=DELETE`} method="post">
                                <button className="button-delete-user buttons-user" type="submit">
                                    <i className="fa-solid fa-user-xmark"></i>Eliminar cuenta
                                </button>
                            </form>
                        </div>
                        <div className="div-container-options-config-user">
                            <div className="content-user-page">
                                <div className="user-post content">
                                    <a href="/user/products" className="button-edit-user buttons-user" type="submit">
                                        <i className="fa-regular fa-paste"></i>Mis publicaciones
                                    </a>
                                </div>
                            </div>
                            <div className="form-user-page">
                                        <Link to={`/user/${user && user.user_id}/edit`} className="button-edit-user buttons-user" type="submit">
                                            <i className="fa-solid fa-pencil"></i>Editar perfil
                                        </Link> {/* user && user.user_id */}
                                {locals && locals.user && locals.user.user_id && (
                                    <>
                                        <a href="/user/orders" className="button-edit-user buttons-user">
                                            <p>Orders</p>
                                        </a>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
};

export default UserConfig;