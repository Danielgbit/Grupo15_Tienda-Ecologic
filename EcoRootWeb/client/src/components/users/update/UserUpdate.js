import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import PasswordConfig from "../../passwordConfig/passwordConfig";



const UserUpdate = ({ userData, countries }) => {

            //DATA USER

            const navigate = useNavigate();
            
            //...........
            
            const [user, setUserData] = useState({});
            const [formData, setFormData] = useState({});
            const [image, setImage] = useState(null);
            const [errorsApi, setErrorsPostApi] = useState([]);
            const [formSubmitted, setFormSubmitted] = useState(false);
            
                useEffect(() => {
                    setUserData(userData);
                    setFormData(userData); // Inicializar formData con userData
                }, [userData]);
        
                const handleInputChange = (event) => {
                    const { name, value } = event.target;
            
                    // Actualizar el estado del formulario directamente
                    setFormData((prevData) => ({
                        ...prevData,
                        [name]: value,
                    }));

                    
                    console.log('Input changed:', { name, value });
                    console.log('Current formData:', formData);
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
        
                const response = await fetch(`http://localhost:3000/api/user/edit/${user.user_id}`, {
                    method: "PUT",
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
                    console.log('Usuario ingresó éxitosamente');
                    navigate('/user/config');
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

            console.log(formData);

            const errors = errorsApi.reduce((acc, error) => {
            const fieldName = Object.keys(error)[0];
            const errorMessage = Object.values(error)[0];
            return {
                ...acc,
                [fieldName]: errorMessage
            };
        }, {});


    return (
        <div className="body-user-edit" >
        <main>
            <div className="div-user-edit">
                <h1>Edición de usuario</h1>

                <form onSubmit={handleSubmit} className="form-user-edit"  encType="multipart/form-data">

                    <img className="img-user-edit" src={`http://localhost:3000/api/user/avatar/${user && user.user_id}`} alt="foto de perfil" />
                    <span className="icon-arrow-user-edit-head"><i className="fa-solid fa-angles-down"></i></span>
                    <section className="form-create-5">

                        <div className={`input-img ${errors && errors.image ? 'register-label-avatar' : ''}`}>
                            <label htmlFor="avatar" className="label-avatar-user-edit">
                                <span className="avatar-description-userEdit">Agrega tu nuevo avatar</span>
                                <label htmlFor="avatar" className="form-dropArea-imgs-singUp custom-file-input-user-edit">
                                    <input 
                                    type="file" 
                                    id="avatar" 
                                    name="image" 
                                    onChange={handleImageChange}
                                    accept="image/*" />
                                   
                                </label>
                            </label>
                            <ul className="errors-createP-front ul-error-container-avatar error-avatar"></ul>
                            {errors && errors.image && (
                                <span className="errorsLoginMsg"> <span>{errors.image}</span> </span>
                            )}
                        </div>
                    </section>

                    <div className="div-contain-divs-max-user-edit">
                        <div className="div-left-user-edit-contain">

                            <div className={`input-user-edit ${errors && errors.first_name ? 'login-input-invalid' : ''}`}>
                                <label htmlFor="first_name">Nombre:</label>
                                <input
                                    value={formData.first_name || ''}
                                    type="text"
                                    id="first_name"
                                    name="first_name"
                                    onChange={handleInputChange}
                                />
                                <ul className="errors-createP-front error-first-name"></ul>
                                {errors && errors.first_name && (
                                    <span className="errorsLoginMsg"> <span>{errors.first_name}</span> </span>
                                )}
                            </div>

                            <div className={`input-user-edit ${errors && errors.last_name ? 'login-input-invalid' : ''}`}>
                                <label htmlFor="last_name">Apellido:</label>
                                <input
                                    value={user && user.last_name ? user.last_name : ''}
                                    type="text"
                                    id="last_name"
                                    name="last_name"
                                    onChange={handleInputChange}
                                />
                                <ul className="errors-createP-front error-last-name"></ul>
                                {errors && errors.last_name && (
                                    <span className="errorsLoginMsg"> <span>{errors.last_name}</span> </span>
                                )}
                            </div>

                            <div className={`input-user-edit ${errors && errors.username ? 'login-input-invalid' : ''}`}>
                                <label htmlFor="username">Nombre de usuario:</label>
                                <input
                                    value={user && user.username ? user.username : ''}
                                    type="text"
                                    id="username"
                                    name="username"
                                    onChange={handleInputChange}
                                />
                                <ul className="errors-createP-front error-username"></ul>
                                {errors && errors.username && (
                                    <span className="errorsLoginMsg"> <span>{errors.username}</span> </span>
                                )}
                            </div>

                            <div className={`input-user-edit ${errors && errors.email ? 'login-input-invalid' : ''}`}>
                                <label htmlFor="email">Correo electrónico:</label>
                                <input
                                    value={user && user.email ? user.email : ''}
                                    type="email"
                                    id="email"
                                    name="email"
                                    onChange={handleInputChange}
                                />
                                <ul className="errors-createP-front error-email"></ul>
                                {errors && errors.email && (
                                    <span className="errorsLoginMsg"> <span>{errors.email}</span> </span>
                                )}
                            </div>
                            <PasswordConfig/>     
                            <div className="input-user-edit">
                                <label htmlFor="password">Nueva contraseña:</label>
                                <div className="password-contain-input">
                                    <input
                                        className={`input-passw-register input-passw-global ${errors && errors.password ? 'login-input-invalid' : ''}`}
                                        type="password"
                                        id="password"
                                        name="password"
                                        onChange={handleInputChange}
                                    />
                                    <div className="div-container-password-view">
                                        <span className="view-password"><i className="fa-solid fa-eye"></i></span>
                                            <span className="not-view-password">
                                            <i className="fa-solid fa-eye-slash"></i>
                                        </span>
                                    </div>
                                </div>
                                    <div className="contain-security-level-password">
                                        <span className="security-level"></span>
                                        <span className="text-security-password"></span>
                                    </div>
                                    <ul className="errors-createP-front error-password"></ul>
                                    {errors && errors.password && (
                                        <span className="errorsLoginMsg"> <span>{errors.password}</span> </span>
                                    )}
                            </div>
                        </div>

                        <div className="div-right-user-edit-contain">
                            <div className={`input-user-edit ${errors && errors.country ? 'register-input-invalid-icon' : ''}`}>
                                <label htmlFor="country">País:</label>
                                <select
                                    onChange={handleInputChange}
                                    name="country"
                                    id="country"
                                    className={`countries-select ${errors && errors.country ? "country-label-Errors" : ''}`}
                                >
                                    <option value="" disabled selected>Selecciona un país</option>
                                    {countries && countries.map((country) => (
                                        <option
                                        key={country}
                                        value={country}
                                        selected={user && user.country === country ? 'selected' : null}
                                        >
                                        {country}
                                        </option>
                                    ))}
                                </select>
                                <ul className="errors-createP-front error-country"></ul>
                                {errors && errors.country && (
                                    <span className="errorsLoginMsg"> <span>{errors.country}</span> </span>
                                )}
                            </div>

                            <div className={`input-user-edit ${errors && errors.city ? 'login-input-invalid' : ''}`}>
                                <label htmlFor="city">Ciudad:</label>
                                <input
                                    onChange={handleInputChange}
                                    value={user && user.city ? user.city : ''}
                                    type="text"
                                    id="city"
                                    name="city"
                                />
                                <ul className="errors-createP-front error-city"></ul>
                                {errors && errors.city && (
                                    <span className="errorsLoginMsg"> <span>{errors.city}</span> </span>
                                )}
                            </div>

                            <div className={`input-user-edit ${errors && errors.address ? 'login-input-invalid' : ''}`}>
                                <label htmlFor="address">Dirección:</label>
                                <input
                                    onChange={handleInputChange}
                                    value={user && user.address ? user.address : ''}
                                    type="text"
                                    id="address"
                                    name="address"
                                />
                                <ul className="errors-createP-front error-address"></ul>
                                {errors && errors.address && (
                                    <span className="errorsLoginMsg"> <span>{errors.address}</span> </span>
                                )}
                            </div>

                            <div className={`input-user-edit ${errors && errors.birthDate ? 'register-input-invalid-icon' : ''}`}>
                                <label htmlFor="birthDate">Fecha de nacimiento</label>
                                <input
                                    onChange={handleInputChange}
                                    type="date"
                                    id="birthDate"
                                    name="birthDate"
                                    className={`birthDate-input-Errors ${errors && errors.birthDate ? "birthDate-input-Errors" : ''}`}
                                    value={user && user.birthDate ? user.birthDate : ''}
                                />
                                <ul className="errors-createP-front error-birth-date"></ul>
                                {errors && errors.birthDate && (
                                    <span className="errorsLoginMsg"> <span>{errors.birthDate}</span> </span>
                                )}
                            </div>

                            <div className={`input-user-edit select-hidden ${errors && errors.gender ? 'register-input-invalid-icon' : ''}`}>
                                <label htmlFor="gender">Género:</label>
                                <select
                                    onChange={handleInputChange}
                                    name="gender"
                                    id="gender"
                                    className={`select-gender ${errors && errors.gender ? "country-label-Errors" : ''}`}
                                >
                                    <option value="" selected>Selecciona un género</option>
                                    <option value="male" selected={user && (user.gender === 'male')}>Masculino</option>
                                    <option value="female" selected={user && (user.gender === 'female')}>Femenino</option>
                                </select>
                                <ul className="errors-createP-front error-gender"></ul>
                                {errors && errors.gender && (
                                    <span className="errorsLoginMsg"> <span>{errors.gender}</span> </span>
                                )}
                            </div>
                        </div>
                    </div>
                    <input className="button-register" type="submit" value="Actualizar información" />
                </form>
            </div>
        </main>
    </div>
    )
};

export default UserUpdate;