import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreateProductValidation from '../../../../validations/CreateProductValidation';

const ProductCreateForm = ({ category, brands, colors, formDataOld, user }) => {

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
        user_id: user.user_id
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
  
        const response = await fetch("http://localhost:3000/api/product/create", {
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
          console.log('Producto creado exitosamente');
          navigate('/products');
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


    const errorsObject = errorsApi.reduce((acc, error) => {
      const fieldName = Object.keys(error)[0];
      const errorMessage = Object.values(error)[0];
      return {
          ...acc,
          [fieldName]: errorMessage
      };
  }, {});



  





    return (
        <div id="create-product-body">
        <main className="main-create-category">
            <section className="header-create">
                <h1>Creacion de producto</h1>
                <img src="/img/logos/eco.png" alt="Logo-article" />
            </section>
            <form   onSubmit={handleSubmit} className="form-create-1 form-createProduct" encType="multipart/form-data">
                <article className="container-cards-category">
                <div className="condition-text-header">
                    <span className={`text-title ${errorsObject && errorsObject.category ? 'is-invalid' : null}`}>
                        ¡Hola! Antes que nada cuéntanos, ¿qué vas a publicar?
                    </span>
                    <span className="text-step">Paso 1 de 6</span>
                    <ul className="errors-createP-front error-category"></ul>
                    {errorsObject && errorsObject.category && (
                        <span className="errorsCreateProduct">{errorsObject.category}</span>
                    )}
                </div>
                    {category && category.map((category) => (
                    <label key={category.category_id} className="categoryCards">
                        <input
                        type="radio"
                        name="category"
                        value={category.category_id}
                        id='category-validation'
                        className="radio-input category-input"
                        checked={formDataOld && formDataOld.category === category.category_name}
                        onChange={handleInputChange}

                        />
                        <span className="custom-radio">
                        <i className="fa-regular fa-circle-check"></i>
                        </span>
                        <img src={`/img/categories/${category.image}`} alt="" />
                        <span>{category.category_name}</span>
                    </label>
                    ))}
                </article>
                <section className="container-information-form">     
                    <div class="condition-text-header">
                        <span class="text-title">Completa la información de tu producto</span>
                        <span class="text-step">Paso 2 de 6</span>
                    </div>
                </section>

                <article className="form-condition-items-wrapper">
                    <section class="section-1-information">

                        <div className="input-information-container">
                            <label htmlFor="name">Nombre del Producto:</label>
                            <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name && formData.name}
                            className={`<%= locals.errors && errors.name ? "is-invalid" : null %}`}
                            onChange={handleInputChange}
                            />
                            <ul className="errors-createP-front error-name"></ul>
                            {errorsObject && errorsObject.name && (
                            <span className="errorsCreateProduct">{errorsObject.name}</span>
                            )}
                        </div>

                        <div className="input-information-container input-register">
                            <label htmlFor="brand">Marca:</label>
                            <select 
                            id="brand" 
                            name="brand"
                            onChange={handleInputChange}
                            className={`countries-select ${errorsObject && errorsObject.brand? 'is-invalid' : null}`}>
                            <option value="">Selecciona una marca</option>
                            {brands && brands.map((brand) => (
                                <option key={brand.brand_id} value={brand.brand_id} selected={formDataOld && formDataOld.brand === brand.brand_id}>
                                {brand.brand_name}
                                </option>
                            ))}
                            </select>
                            <ul className="errors-createP-front error-brand"></ul>
                            {errorsObject && errorsObject.brand && (
                                <span className="errorsCreateProduct">{errorsObject.brand}</span>
                            )}
                        </div>
{/*                         <input  
                            onChange={handleInputChange}
                            type="hidden" 
                            name="user_id" 
                            value={user && isLoggedIn && user.user_id}
                        /> */}
                        <div className="input-information-container input-register">
                            <label htmlFor="color">Color:</label>
                            <select 
                            onChange={handleInputChange}
                            id="color" 
                            name="color" 
                            className={`countries-select ${errorsObject && errorsObject.color ? 'is-invalid' : null}`}>
                                <option value="">Selecciona un color</option>
                                {colors && colors.map((color) => (
                                <option key={color.color_id} value={color.color_id} selected={formDataOld && formDataOld.color === color.color_id}>
                                    {color.color_name}
                                </option>
                                ))}
                            </select>
                            <ul className="errors-createP-front error-color"></ul>
                            {errorsObject && errorsObject.color && (
                                <span className="errorsCreateProduct">{errorsObject.color}</span>
                            )}
                        </div>
                            
                    </section>

                    <section class="section-2-information">

                        <div className="input-information-container">
                            <label htmlFor="united">Unidades:</label>
                            <input
                                onChange={handleInputChange}
                                type="number"
                                id="united"
                                value={formDataOld && formDataOld.united ? formDataOld.united : null}
                                name="united"
                                className={`<%= locals.errors && errors.united ? "is-invalid" : null %}`}
                            />
                            <ul className="errors-createP-front error-united"></ul>
                            {errorsObject && errorsObject.united && (
                                <span className="errorsCreateProduct">{errorsObject.united}</span>
                            )}
                        </div>
                        
                        <div className="input-information-container">
                            <label htmlFor="discount">Descuento:</label>
                            <input
                                onChange={handleInputChange}
                                type="number"
                                maxLength="2"
                                id="discount"
                                value={formDataOld && formDataOld.discount && formDataOld.discount}
                                name="discount"
                                placeholder="%"
                                className={`countries-select ${errorsObject && errorsObject.discount ? 'is-invalid' : null}`}
                            />
                            <ul className="errors-createP-front error-discount"></ul>
                            {errorsObject && errorsObject.discount && (
                                <span className="errorsCreateProduct">{errorsObject.discount}</span>
                            )}
                        </div>

                        <div className="input-information-container">
                            <label htmlFor="material">Material:</label>
                            <div>
                                <input
                                onChange={handleInputChange}
                                type="text"
                                id="material"
                                value={formDataOld && formDataOld.material ? formDataOld.material : null}
                                name="material"
                                className={`<%= locals.errors && errors.material ? "is-invalid" : null %}`}
                                />
                            </div>
                            <ul className="errors-createP-front error-material"></ul>
                            {errorsObject && errorsObject.material && (
                                <span className="errorsCreateProduct">{errorsObject.material}</span>
                            )}
                        </div>
                        
                    </section>
                </article>

                <article class="form-condition-items-wrapper">
                    <section class="condition-container">

                        <div className="condition-text-header">
                            <span className={`text-title ${errorsObject && errorsObject.state ? 'is-invalid' : null}`}>
                                ¿Cuál es la condición de tu producto?
                            </span>
                            <span className="text-step">Paso 3 de 6</span>
                        </div>

                        <div className="condition-form">
                            <label className="estado-label">
                                <input
                                onChange={handleInputChange}
                                type="radio"
                                name="state"
                                value="New"
                                className="radio-input-condition"
                                checked={formDataOld && formDataOld.state === 'New'}
                                />
                                Nuevo
                                <span className="artificial-radio"><i className="fa-regular fa-circle-check"></i></span>
                            </label>

                            <label className="estado-label">
                                <input
                                onChange={handleInputChange}
                                type="radio"
                                name="state"
                                value="Used"
                                className="radio-input-condition"
                                checked={formDataOld && formDataOld.state === "Used"}
                                />
                                Usado
                                <span className="artificial-radio"><i className="fa-regular fa-circle-check"></i></span>
                            </label>
                            <ul className="errors-createP-front error-state"></ul>
                            {errorsObject && errorsObject.state && <span className="errorsCreateProduct">{errorsObject.state}</span>}
                        </div>

                    </section>
                    <section class="form-create-5">
                        
                        <div className="text-header-create-container">
                            <span className={`title-step-5 ${errorsObject && errorsObject.image ? 'is-invalid' : null}`}>
                                Completa la información de tu producto
                            </span>
                            <span className="step-5">Paso 4 de 6</span>
                            <p className="paragraph-step-5">
                                Para no perder exposición, asegúrate de que la primera foto tenga fondo blanco puro
                                creado con un editor de fotos.
                            </p>
                        </div>

                        <label htmlFor="image" className={`form-dropArea-imgs ${errorsObject && errorsObject.image ? 'inputImage-Error' : null}`}>
                            <i className="fa-solid fa-camera"></i>
                            <label htmlFor="image" className="custom-file-input">
                                <input type="file" name="image" accept="image/*" id="image" onChange={handleImageChange} />
                            </label>
                        </label>
                        {errorsObject && errorsObject.image && (
                            <span className="errorsLoginMsg">
                                <span>{errorsObject.image}</span>
                            </span>
                        )}
                    </section>
                </article>


                <article className="form-descriptionPrice-items-wrapper">
                    <section class="form-create-4">

                        <div className="text-header-create-container">
                            <span
                                className={`title-step-4 ${errorsObject && errorsObject.description ? 'is-invalid' : null}`}
                            >
                                ¿Cuál es la condición de tu producto?
                            </span>
                            <span className="step-4">Paso 5 de 6</span>
                            <p className="description-pharagraph">
                                No incluyas datos de contacto, como e-mails, teléfonos, direcciones, links ni
                                referencias a sitios externos. Tampoco uses este espacio para indicar la condición
                                de tu producto.
                            </p>
                        </div> 

                        <section>
                            <div className="description-container">
                                <textarea
                                onChange={handleInputChange}
                                id="description"
                                name="description"
                                maxLength="400"
                                rows="4"
                                cols="50"
                                className={`description-box ${errorsObject && errorsObject.description ? 'textArea-Description-Error' : null}`}
                                value={formDataOld && formDataOld.description && formDataOld.description}
                                />
                            </div>

                            <div className="div-msg-description-Error">
                                <ul className="errors-createP-front error-description"></ul>
                                {errorsObject && errorsObject.description && (
                                <span className="errorsCreateProduct">{errorsObject.description}</span>
                                )}
                            </div>
                        </section>       
                            
                    </section>

                    <section class="form-create-6">

                        <div className="text-header-create-container">
                            <span className="title-step-6">Para terminar, definamos las condiciones de venta</span>
                            <span className="step-6">Paso 6 de 6</span>
                        </div>
                        
                        <div className="form-image-price">
                            <div className="input-information-container">
                                <label htmlFor="price" className="priceText">¿Cuál es el precio?</label>
                                <input
                                    onChange={handleInputChange}
                                    type="number"
                                    id="price"
                                    name="price"
                                    min="0"
                                    step="0.01"
                                    placeholder="$"
                                    value={formDataOld && formDataOld.price ? formDataOld.price : null}
                                    className={`<%= locals.errors && errors.price ? "is-invalid" : null %}`}
                                />
                                <ul className="errors-createP-front error-price"></ul>
                                {errorsObject && errorsObject.price && (
                                <span className="errorsCreateProduct">{errorsObject.price}</span>
                                )}
                            </div>
                        </div>
                    </section>
                </article>


                <div class="buttons-submit-step-5-6">
                <button type="submit" id="submit" class="submit-create-form-container"> Crear producto
                </button>
            </div>
            </form>
        </main>
    </div>
    );
  };
  
  export default ProductCreateForm;
  