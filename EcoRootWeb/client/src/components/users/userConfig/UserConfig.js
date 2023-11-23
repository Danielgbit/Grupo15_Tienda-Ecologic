import { Link } from "react-router-dom";
import UserDestroy from "../delete/UserDestroy";
import { useEffect, useState } from "react";

const UserConfig = () => {
    
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [dataUser, setDataUser] = useState();


    useEffect(() => {
        const checkAuthentication = async () => {
          try {
            const response = await fetch('http://localhost:3000/api/check/authentication/user', {
              method: 'GET',
              credentials: 'include', // Incluye las cookies en la solicitud
            });
    
            if (!response.ok) {
              throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            }
            
            const data = await response.json();
            
            if (data.success) {
                setDataUser(data.user)
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

    return(
        <div className="body-userpage">
            <main>
                <div className="container-user-div">
                    <h1>¡Bienvenido a configuración de usuario!</h1>
                    <div className="div-container-user-content-max">
                        <div className="div-info-user-head-container">
                            {isLoggedIn && (
                                <h2>¡Hola! {dataUser && dataUser.first_name} {dataUser && dataUser.last_name}</h2>
                            )}

                            {isLoggedIn && (
                                <img className="img-user-page" src={`http://localhost:3000/api/user/avatar/${dataUser.user_id}`} alt="foto de perfil" />
                            )}
                            {/* //COMPONENT DESTROY */}
                            <UserDestroy
                                userId={dataUser && dataUser.user_id}
                            />
                            {/* //COMPONENT DESTROY */}
                        </div>
                        <div className="div-container-options-config-user">
                            <div className="content-user-page">
                                <div className="user-post content">
                                    <Link to={`/user/${dataUser && dataUser.user_id}/products`} className="button-edit-user buttons-user" type="submit">
                                        <i className="fa-regular fa-paste"></i>Mis publicaciones
                                    </Link>
                                </div>
                            </div>
                            <div className="form-user-page">
                                        <Link to={`/user/${dataUser && dataUser.user_id}/edit`} className="button-edit-user buttons-user" type="submit">
                                            <i className="fa-solid fa-pencil"></i>Editar perfil
                                        </Link> {/* user && user.user_id */}
                                {isLoggedIn && (
                                    <>
                                        <Link to={`/user/${dataUser && dataUser.user_id}/orders`} className="button-edit-user buttons-user">
                                            <p>Orders</p>
                                        </Link>
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