import React, { useEffect, useState } from 'react';


const ProductUpdate = ({ product, brands, colors, categories, errors }) => {

    const [locals, setLocals] = useState([]);

    useEffect(() => {
        setLocals([]);
    }, []);


    return (
        <div id="body-edit-product">    
            <main className="main-create-category">
                <section className="header-create">
                    <h1>Edición de producto</h1>
                </section>

                <form className="form-create-1" id="form-edit-product"  method="post" encType="multipart/form-data">

                    <div className={`condition-text-header ${errors && errors.category ? "is-invalid" : ""}`}>
                    <span className="text-title">¡Hola! cuéntanos, ¿qué quieres editar?</span>
                    <ul className="errors-createP-front error-category"></ul>
                    {errors && errors.category && (
                        <span className="errorsCreateProduct">{errors.category}</span>
                    )}
                    </div>

                    <article className="container-cards-category">

                        
                    {categories && categories.map((category) => (
                        <label key={category.category_id} className="categoryCards">
                        <input
                            type="radio"
                            name="category"
                            value={category.category_id}
                            className="radio-input"
                            checked={category.category_id === product.category_id}
                        />
                        <span className="custom-radio"><i className="fa-regular fa-circle-check"></i></span>
                        <img src={`http://localhost:3000${product.image}`} alt="" />
                        <span>{category.category_name}</span>
                        </label>
                    ))}
                    </article>

                    <section className="container-information-form">
                    <article className="form-information-items-wrapper">
                        <section className="section-1-information">
                        <div className="input-information-container">
                                <label htmlFor="name">Nombre del Producto:</label>
                                <input type="text" id="name" name="name" value={product && product.name} />
                                <ul className="errors-createP-front error-name"></ul>
                                {errors && errors.name && (
                                    <span className="errorsCreateProduct">{errors.name}</span>
                                )}
                                </div>

                                {/* //AQUI VAMOS */}

                                <div className="input-information-container">
                                <label htmlFor="brand">Marca:</label>
                                <select name="brand" id="brand" className="countries-select">
                                    {brands && brands.map((brand) => (
                                    <option key={brand.brand_id} value={brand.brand_id}>
                                        {brand.brand_name}
                                    </option>
                                    ))}
                                </select>
                                <ul className="errors-createP-front error-brand"></ul>
                                {errors && errors.brand && (
                                    <span className="errorsCreateProduct">{errors.brand}</span>
                                )}
                                </div>

                                <div className="input-information-container">
                                <label htmlFor="color">Color:</label>
                                <select name="color" id="color" className="colors-select">
                                    {colors && colors.map((color) => (
                                    <option key={color.color_id} value={color.color_id}>
                                        {color.color_name}
                                    </option>
                                    ))}
                                </select>
                                <ul className="errors-createP-front error-color"></ul>
                                {locals.errors && errors.color && (
                                    <span className="errorsCreateProduct">{errors.color}</span>
                                )}
                                </div>

                        </section>

                        <section className="section-2-information">
                        <div className="input-information-container">
                                <label htmlFor="united">Unidades:</label>
                                <input
                                    type="number"
                                    id="united"
                                    name="united"
                                    value={product && product.united}
                                />
                                <ul className="errors-createP-front error-united"></ul>
                                {errors && errors.united && (
                                    <span className="errorsCreateProduct">{errors.united}</span>
                                )}
                                </div>

                                <div className="input-information-container">
                                <label htmlFor="discount">Descuento</label>
                                <input
                                    type="number"
                                    id="discount"
                                    name="discount"
                                    value={parseInt(product && product.discount)}
                                    placeholder="%"
                                />
                                <ul className="errors-createP-front error-discount"></ul>
                                {errors && errors.discount && (
                                    <span className="errorsCreateProduct">{errors.discount}</span>
                                )}
                                </div>

                                <div className="input-information-container">
                                <label htmlFor="material">Material:</label>
                                <div>
                                    <input
                                    type="text"
                                    id="material"
                                    name="material"
                                    value={product && product.material}
                                    />
                                </div>
                                <ul className="errors-createP-front error-material"></ul>
                                {errors && errors.material && (
                                    <span className="errorsCreateProduct">{errors.material}</span>
                                )}
                                </div>

                        </section>
                    </article>
                    </section>

                    <article className="form-condition-items-wrapper">
                    <section className="condition-container">
                    <div className="condition-form">
                        <label className="estado-label">
                            <input
                                type="radio"
                                name="state"
                                value="New"
                                className="radio-input-condition"
                                checked={product && product.state === 'New'}
                            />
                            Nuevo
                            <span className="artificial-radio"><i className="fa-regular fa-circle-check"></i></span>
                        </label>

                        <label className="estado-label">
                            <input
                                type="radio"
                                name="state"
                                value="Used"
                                className="radio-input-condition"
                                checked={product && product.state === 'Used'}
                            />
                            Usado
                            <span className="artificial-radio"><i className="fa-regular fa-circle-check"></i></span>
                        </label>
                    </div>

                    </section>

                    <hr />

                    <section className="form-create-5">
                        <div className="text-header-create-container">
                            <p className="paragraph-step-5">Para no perder exposición, asegúrate de que la primera foto tenga fondo blanco puro creado con un editor de fotos.</p>
                        </div>

                        <div className="container-img-file">
                            <label htmlFor="image" className="form-dropArea-imgs">
                                <i className="fa-solid fa-camera-rotate"></i>
                                <label htmlFor="image" className="custom-file-input custom-view-edit">
                                    <input type="file" id="image" name="image" accept="image/*" />
                                </label>
                            </label>
                            <div><img src={`http://localhost:3000${product && product.image}`} alt="imagen del producto existente" /></div>
                        </div>
                        <ul className="errors-createP-front error-image"></ul>
                        {errors && errors.image && (
                            <span className="errorsCreateProduct">{errors.image}</span>
                        )}
                        </section>

                    </article>

                    <article className="form-descriptionPrice-items-wrapper">

                        <section className="form-create-4">
                            <div className="text-header-create-container">
                                <p className="description-pharagraph">No incluyas datos de contacto, como e-mails, teléfonos, direcciones, links ni referencias a sitios externos. Tampoco uses este espacio para indicar la condición de tu producto.</p>
                            </div>
                            <section>

                                <div className="description-container">
                                    <textarea id="descripcion" name="description" rows="4" cols="50" className="description-box" defaultValue={product && product.description}></textarea>
                                </div>
                                <ul className="errors-createP-front error-description"></ul>
                                {errors && errors.description && (
                                    <span className="errorsCreateProduct">{errors.description}</span>
                                )}
                            </section>
                        </section>

                        <hr />

                        <section className="form-create-6">
                            <div className="text-header-create-container">
                            </div>

                            <div className="form-image-price">

                                <div className="input-information-container">
                                    <label htmlFor="price" className="priceText">¿Cuál es el precio?</label>
                                    <input type="number" id="price" name="price" min="0" step="0.01" placeholder="$" value={parseInt(product && product.price)} />
                                    <ul className="errors-createP-front error-price"></ul>
                                    {errors && errors.price && (
                                        <span className="errorsCreateProduct">{errors.price}</span>
                                    )}
                                </div>
                            </div>
                        </section>
                    </article>


                    <div className="buttons-submit-step-5-6">
                    <button type="submit" id="submit" className="submit-create-form-container">Editar producto</button>
                    </div>
                </form>
            </main>
        </div>
    );
  };
  
  export default ProductUpdate;
  