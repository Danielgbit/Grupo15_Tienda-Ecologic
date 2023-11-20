import { Link } from "react-router-dom";


const LoginForm = ({ locals, errors, dataOld, countries }) => {
    return (
        <div className="body-login-user">
        <main className="main-register">

        <h1>LOGIN</h1>

        <article className="content-register-wrapper content-login-wrapper">
        <div className="img-login">
            <img src="/img/backgrounds/img-login.jpg" alt="" />
        </div>

        <form className="form-login" action="/user/login" method="post">

            <div className="input-login">
            <label htmlFor="email">Correo electrónico:</label>
            <input
                type="text"
                id="email"
                autoComplete="on"
                name="email"
                className={errors && errors.email ? 'login-input-invalid' : null}
                value={dataOld && dataOld.email ? dataOld.email : null}
            />
            <ul className="errorsLoginMsg error-email"></ul>
            {errors && errors.email && (
                <span className="errorsLoginMsg">
                <span>{errors.email}</span>
                </span>
            )}
            </div>

            <div className="input-login">
            <label htmlFor="password">Contraseña:</label>
            <div className="password-contain-input">
                <input
                className={`input-passw-login input-passw-global ${errors && errors.password ? 'login-input-invalid' : null}`}
                type="password"
                id="password"
                name="password"
                value={dataOld && dataOld.password ? dataOld.password : null}
                />
                <div className="div-container-password-view">
                <span className="view-password"><i className="fa-solid fa-eye"></i></span>
                <span className="not-view-password"><i className="fa-solid fa-eye-slash"></i></span>
                </div>
            </div>
            <ul className="errorsLoginMsg error-password"></ul>
            {errors && errors.password && (
                <span className="errorsLoginMsg">
                <span>{errors.password}</span>
                </span>
            )}
            </div>

            <input className="button-register" type="submit" value="Ingresar" />

            <div className="input-register2">
            <input id="recordar" type="checkbox" name="remember" />
            <label htmlFor="recordar">RECORDAR CONTRASEÑA</label>
            </div>

            <div className="text-account-register-wrapper">
            <Link className="text-account-register" to="/user/register">
                <span>¿No tienes un usuario EcoRoot?</span>
                Crear una cuenta
            </Link>
            </div>

        </form>
        </article>

        </main>
    </div>
    )
}

export default LoginForm;