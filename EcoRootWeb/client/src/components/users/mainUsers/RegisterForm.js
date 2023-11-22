import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordConfig from "../../passwordConfig/passwordConfig";

const RegisterForm = ({ countries, inputDataError, dataOld }) => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({});
    const [image, setImage] = useState(null);
    const [errorsApi, setErrorsPostApi] = useState([]);
    const [formSubmitted, setFormSubmitted] = useState(false);
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleImageChange = (event) => {
      const selectedImage = event.target.files[0];
      setImage(selectedImage);
    };
  
    const handleFormSubmit = async () => {


      try {
        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          formDataToSend.append(key, value);
        });
        formDataToSend.append("image", image);
  
        const response = await fetch("http://localhost:3000/api/user/create", {
          method: "POST",
          body: formDataToSend,
        });
  
        if (!response.ok) {
          const data = await response.json();
          setErrorsPostApi(data.errors || []);
          console.error('Error en la solicitud:', data.errors);
          return;
        }
  
        const data = await response.json();
  
        if (data.success === true) {
          console.log('Usuario registrado exitosamente');
          navigate('/user/login');
          window.location.reload(); // Esto recargará la página
          setErrorsPostApi([]);
        }
        console.log(data);
  
        console.log("formDataToSend", formDataToSend);
      } catch (error) {
        console.error("Error al realizar la solicitud:", error);
      }
    };
  
    useEffect(() => {
      if (formSubmitted) {
        handleFormSubmit();
        setFormSubmitted(false); // Restablecer el estado después de procesar el formulario
      }
    }, [formSubmitted]);
  
    const handleSubmit = (event) => {
      event.preventDefault();
      setFormSubmitted(true); // Indicar que el formulario ha sido enviado
    };


    const errors = errorsApi.reduce((acc, error) => {
      const fieldName = Object.keys(error)[0];
      const errorMessage = Object.values(error)[0];
      return {
          ...acc,
          [fieldName]: errorMessage
      };
  }, {});

console.log(formData);


    return (
        <div className="body-register-user">
        <main className="main-register">
            <h1>REGISTRO</h1>
            <article className="content-register-wrapper">
                <form onSubmit={handleSubmit} className="form-register"  encType="multipart/form-data">
                <div className="container-max-register-flex">
                    <div className="contain-info-flex-1">

                        <div className="input-register">
                            <label htmlFor="first_name">Nombre:</label>
                            <input
                            value={dataOld && dataOld.first_name ? dataOld.first_name : null}
                            type="text"
                            id="first_name"
                            name="first_name"
                            className={errors && errors.first_name ? 'login-input-invalid' : null}
                            onChange={handleInputChange}

                            />
                            <ul className="errorsLoginMsg errorFirstName"></ul>
                            {errors && errors.first_name && (
                            <span className="errorsLoginMsg">
                                <span>{errors.first_name}</span>
                            </span>
                            )}
                        </div>

                        <div className="input-register">
                            <label htmlFor="last_name">Apellido:</label>
                            <input
                            value={dataOld && dataOld.last_name ? dataOld.last_name : null}
                            type="text"
                            id="last_name"
                            name="last_name"
                            className={errors && errors.last_name ? 'login-input-invalid' : null}
                            onChange={handleInputChange}
                            />
                            <ul className="errorsLoginMsg error-last-name"></ul>
                            {errors && errors.last_name && (
                            <span className="errorsLoginMsg">
                                <span>{errors.last_name}</span>
                            </span>
                            )}
                        </div>

                        <div className="input-register">
                            <label htmlFor="username">Nombre de usuario:</label>
                            <input
                            value={dataOld && dataOld.username ? dataOld.username : null}
                            type="text"
                            id="username"
                            name="username"
                            className={errors && errors.username ? 'login-input-invalid' : null}
                            onChange={handleInputChange}

                            />
                            <ul className="errorsLoginMsg error-username"></ul>
                            {errors && errors.username && (
                            <span className="errorsLoginMsg">
                                <span>{errors.username}</span>
                            </span>
                            )}
                        </div>

                        <div className="input-register">
                            <label htmlFor="email">Correo electrónico:</label>
                            <input
                            value={dataOld && dataOld.email ? dataOld.email : null}
                            type="text"
                            id="email"
                            name="email"
                            className={errors && errors.email ? 'login-input-invalid' : null}
                            onChange={handleInputChange}

                            />
                            <ul className="errorsLoginMsg error-email"></ul>
                            {errors && errors.email && (
                                <span className="errorsLoginMsg">
                                    <span>{errors.email}</span>
                                </span>
                            )}
                            {inputDataError && inputDataError.email && (
                                <span className="errorsLoginMsg">
                                    <span>{inputDataError.email}</span>
                                </span>
                            )}
                        </div>
                        <PasswordConfig/>
                    <div className="input-register">
                        <label htmlFor="password">Contraseña:</label>
                            <div className="password-contain-input">
                                <input
                                    className={`input-passw-register input-passw-global ${
                                    errors && errors.password ? 'login-input-invalid' : null
                                    }`}
                                    type="password"
                                    id="password"
                                    name="password"
                                    onChange={handleInputChange}

                                />
                                <div className="div-container-password-view">
                                    <span className="view-password">
                                    <i className="fa-solid fa-eye"></i>
                                    </span>
                                    <span className="not-view-password">
                                    <i className="fa-solid fa-eye-slash"></i>
                                    </span>
                                </div>
                            </div>
                            <div className="contain-security-level-password">
                                <span className="security-level"></span>
                                <span className="text-security-password"></span>
                            </div>
                        <ul className="errorsLoginMsg error-password"></ul>
                        {errors && errors.password && (
                        <span className="errorsLoginMsg">
                            <span>{errors.password}</span>
                        </span>
                        )}
                    </div>
                </div>

                <div className="contain-info-flex-2">
                    <div className="input-register">
                        <label htmlFor="country" className={errors && errors.country ? 'register-input-invalid-icon' : null}>
                        País:
                        </label>
                        <select
                        onChange={handleInputChange}
                        name="country"
                        id="country"
                        className={`countries-select ${errors && errors.country ? 'country-label-Errors' : null}`}
                        >
                        <option value="" disabled selected>
                            Selecciona un país
                        </option>
                        {countries && countries.map((country) => (
                            <option
                            key={country}
                            value={country}
                            selected={dataOld && country === dataOld.country ? 'selected' : null}
                            >
                            {country}
                            </option>
                        ))}
                        </select>
                        <ul className="errorsLoginMsg error-country"></ul>
                        {errors && errors.country && (
                        <span className="errorsLoginMsg">
                            <span>{errors.country}</span>
                        </span>
                        )}
                    </div>

                    <div className="input-register">
                        <label htmlFor="city">Ciudad:</label>
                        <input
                        onChange={handleInputChange}
                        value={dataOld && dataOld.city ? dataOld.city : null}
                        type="text"
                        id="city"
                        name="city"
                        className={errors && errors.city ? 'login-input-invalid' : null}

                        />
                        <ul className="errorsLoginMsg error-city"></ul>
                        {errors && errors.city && (
                        <span className="errorsLoginMsg">
                            <span>{errors.city}</span>
                        </span>
                        )}
                    </div>

                    <div className="input-register">
                        <label htmlFor="address">Dirección:</label>
                        <input
                        onChange={handleInputChange}
                        value={dataOld && dataOld.address ? dataOld.address : null}
                        type="text"
                        id="address"
                        name="address"
                        className={errors && errors.address ? 'login-input-invalid' : null}

                        />
                        <ul className="errorsLoginMsg error-address"></ul>
                        {errors && errors.address && (
                        <span className="errorsLoginMsg">
                            <span>{errors.address}</span>
                        </span>
                        )}
                    </div>

                    <div className="input-register">
                        <label htmlFor="birthDate" className={errors && errors.birthDate ? 'register-input-invalid-icon' : null}>
                        Fecha de nacimiento
                        </label>
                        <input
                        onChange={handleInputChange}
                        type="date"
                        id="birthDate"
                        name="birthDate"
                        className={`${
                            errors && errors.birthDate ? 'birthDate-input-Errors' : null
                        }`}
                        value={dataOld && dataOld.birthDate ? dataOld.birthDate : null}
                        />
                        <ul className="errorsLoginMsg error-birth-date"></ul>
                        {errors && errors.birthDate && (
                        <span className="errorsLoginMsg">
                            <span>{errors.birthDate}</span>
                        </span>
                        )}
                    </div>

                    <div className="input-register">
                        <label htmlFor="gender" className={errors && errors.gender ? 'register-input-invalid-icon' : null}>
                        Género:
                        </label>
                        <select
                        onChange={handleInputChange}
                        name="gender"
                        id="gender"
                        className={`select-gender ${errors && errors.gender ? 'country-label-Errors' : null}`}
                        >
                        <option value="" selected>
                            Selecciona un género
                        </option>
                        <option
                            value="male"
                            selected={dataOld && dataOld.gender === 'male' ? 'selected' : null}
                        >
                            Masculino
                        </option>
                        <option
                            value="female"
                            selected={dataOld && dataOld.gender === 'female' ? 'selected' : null}
                        >
                            Femenino
                        </option>
                        </select>
                        <ul className="errorsLoginMsg error-gender"></ul>
                        {errors && errors.gender && (
                        <span className="errorsLoginMsg">
                            <span>{errors.gender}</span>
                        </span>
                        )}
                    </div>
                </div>
            </div>

            <section className="form-create-5 form-register-img">
                <label htmlFor="foto">Avatar</label>
                <div className="text-header-register-container">
                    <p className="paragraph-step-5">
                    Para no perder exposición, asegúrate de que la primera foto tenga fondo blanco puro creado con un editor de fotos.
                    </p>
                </div>

                <div className="input-img">
                    <label
                    htmlFor="image"
                    className={`area-register-img ${errors && errors.image ? 'register-label-avatar' : null}`}
                    >
                    <i className="fa-solid fa-user-astronaut"></i>
                    <label htmlFor="image" className="custom-file-input custom-register form-dropArea-imgs-singUp">
                        <input type="file" name="image" accept="image/*" id="image" onChange={handleImageChange} />
                    </label>
                    </label>
                    <ul className="errorsLoginMsg error-avatar"></ul>
                    {errors && errors.image && (
                    <span className="errorsLoginMsg">
                        <span>{errors.image}</span>
                    </span>
                    )}
                </div>
                </section>

                <input className="button-register" type="submit" value="Registrarse" />

                <div className="text-account-register-wrapper">
                    <Link className="text-account-register" to="/user/login">
                        ¿Ya tienes una cuenta?
                    </Link>
                </div>
                </form>

            </article>

        </main>
        
    </div>
    )
};


export default RegisterForm;