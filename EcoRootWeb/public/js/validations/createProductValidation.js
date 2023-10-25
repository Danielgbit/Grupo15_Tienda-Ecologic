window.addEventListener('load', () => {
    const form = document.querySelector('.form-create-1');
    const category = document.querySelector('.radio-input');
    const name = document.querySelector('#name');
    const brand = document.querySelector('#brand');
    const color = document.querySelector('#color');
    const united = document.querySelector('#united');
    const discount = document.querySelector('#discount');
    const material = document.querySelector('#material');
    const state = document.querySelector('.radio-input-condition');
    const image = document.querySelector('#image');
    const descripcion = document.querySelector('#descripcion');
    const price = document.querySelector('#price');


    const errorCategory = document.querySelector('.error-category');
    const errorName = document.querySelector('.error-name');
    const errorBrand = document.querySelector('.error-brand');
    const errorColor = document.querySelector('.error-color');
    const errorUnited = document.querySelector('.error-united');
    const errorDiscount = document.querySelector('.error-discount');
    const errorMaterial = document.querySelector('.error-material');
    const errorState = document.querySelector('.error-state');
    const errorImage = document.querySelector('.error-image');
    const errorDescription = document.querySelector('.error-description');
    const errorPrice = document.querySelector('.error-price');

    const errors = {};


    name.addEventListener('input', (e) => {

        const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;
        const errorContent = document.createElement('li');

        if (e.target.value.length < 8 && e.target.value.length > 2) {
            errorName.textContent = '';
            errorContent.textContent = 'Debe tener minimo 8 caracteres';
            errorName.appendChild(errorContent);
        } else {
            errorName.textContent = '';
        };

        if (specialCharacters.test(name.value)) {
            errorName.textContent = '';
            errorContent.textContent = 'El nombre de producto no contener caracteres especiales @-/_+$';
            errorName.appendChild(errorContent);
        } else if (name.value.length > 30) {
            errorName.textContent = '';
            errorContent.textContent = 'El nombre no puede sobrepasar los 30 caracteres';
            errorName.appendChild(errorContent);
        };

    });

    united.addEventListener('input', (e) => {

        const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;
        const errorContent = document.createElement('li');


        if (united.value.length > 3) {
            errorUnited.textContent = '';
            errorContent.textContent = 'No puede sobrepasar los 3 digitos - por normas de la empresa';
            errorUnited.appendChild(errorContent);
        } else {
            errorUnited.textContent = '';
        };

        if (specialCharacters.test(name.value)) {
            errorUnited.textContent = '';
            errorContent.textContent = 'Solo puede contener numeros';
            errorUnited.appendChild(errorContent);
        } else if (name.value.length > 30) {
            errorUnited.textContent = '';
            errorContent.textContent = 'El nombre no puede sobrepasar los 30 caracteres';
            errorUnited.appendChild(errorContent);
        };

    });

    const validateCategory = (category) => {

        if (category.value.length <= 0) {
            if (!errors.category) {
                errors.category = [];
            }
            errors.category.push('Debes seleccionar una categoria');
        };

        if (errors.category.length > 0) {
            errors.category.forEach((error) => {
                const errorContent = document.createElement('li');
                errorContent.textContent = error;
                errorCategory.appendChild(errorContent);
            });

        };

    };

    const validateName = (name) => {

        const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;

        if (name.value.length < 8 && name.value.length > 0) {
            if (!errors.name) {
                errors.name = [];
            };
            errors.name.push('Debe tener minimo 8 caracteres');
        };

        if (specialCharacters.test(name.value)) {
            if (!errors.name) {
                errors.name = [];
            };
            errors.name.push('El nombre de producto no contener caracteres especiales @-/_+$');
        };

        if (name.value.length > 30) {
            if (!errors.name) {
                errors.name = [];
            }
            errors.name.push('El nombre no puede sobrepasar los 30 caracteres');
        };
        if (name.value.length <= 0) {
            if (!errors.name) {
                errors.name = [];
            }
            errors.name.push('Debes ingresar un nombre de producto');
        };

        if (errors.name.length > 0) {
            errors.name.forEach((error) => {
                const errorContent = document.createElement('li');
                errorContent.textContent = error;
                errorName.appendChild(errorContent);
            });

        };


    };

    const validateUnited = (united) => {


        if (united.value.length > 3) {
            if (!errors.united) {
                errors.united = [];
            }
            errors.united.push('No puede sobrepasar los 3 digitos - por normas de la empresa');
        };
        if (united.value.length <= 0) {
            if (!errors.united) {
                errors.united = [];
            }
            errors.united.push('Ingresa el numero de unidades de tu producto');
        };

        if (errors.united.length > 0) {
            errors.united.forEach((error) => {
                const errorContent = document.createElement('li');
                errorContent.textContent = error;
                errorUnited.appendChild(errorContent);
            });

        };


    };

    const validateBrand = (brand) => {

        if (brand.value.length <= 0) {
            if (!errors.brand) {
                errors.brand = [];
            }
            errors.brand.push('Debes ingresar una marca');
        };

        if (errors.brand.length > 0) {
            errors.brand.forEach((error) => {
                const errorContent = document.createElement('li');
                errorContent.textContent = error;
                errorBrand.appendChild(errorContent);
            });

        };


    };

    const validateColor = (color) => {

        if (color.value.length <= 0) {
            if (!errors.color) {
                errors.color = [];
            }
            errors.color.push('Ingresa un color o sin color');
        };

        if (errors.color.length > 0) {
            errors.color.forEach((error) => {
                const errorContent = document.createElement('li');
                errorContent.textContent = error;
                errorColor.appendChild(errorContent);
            });

        };


    };

    const validateDiscount = (discount) => {

        if (discount.value.length > 2) {
            if (!errors.discount) {
                errors.discount = [];
            }
            errors.discount.push('El descuento no puede sobrepasar los 2 digitos');
        };
        if (discount.value.length <= 0) {
            if (!errors.discount) {
                errors.discount = [];
            }
            errors.discount.push('Agrega un valor o ingresa "0" para indicar que no hay descuento');
        };

        if (errors.discount.length > 0) {
            errors.discount.forEach((error) => {
                const errorContent = document.createElement('li');
                errorContent.textContent = error;
                errorDiscount.appendChild(errorContent);
            });

        };


    };

    const validateMaterial = (material) => {

        const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;


        if (material.value.length < 4 && material.value.length > 0) {
            if (!errors.material) {
                errors.material = [];
            };
            errors.material.push('Debe tener minimo 4 caracteres');
        };

        if (specialCharacters.test(material.value)) {
            if (!errors.material) {
                errors.material = [];
            };
            errors.material.push('No contener caracteres especiales @-/_+$');
        };

        if (material.value.length > 10) {
            if (!errors.material) {
                errors.material = [];
            }
            errors.material.push('No puedes sobrepasar los 10 caracteres');
        };
        if (material.value.length <= 0) {
            if (!errors.material) {
                errors.material = [];
            }
            errors.material.push('Ingresa el nombre del material');
        };

        if (errors.material.length > 0) {
            errors.material.forEach((error) => {
                const errorContent = document.createElement('li');
                errorContent.textContent = error;
                errorMaterial.appendChild(errorContent);
            });

        };


    };

    const validateState = (state) => {



        if (state.value.length <= 0) {
            if (!errors.state) {
                errors.state = [];
            }
            errors.state.push('Selecciona el estado del producto');
        };

        if (errors.state.length > 0) {
            errors.state.forEach((error) => {
                const errorContent = document.createElement('li');
                errorContent.textContent = error;
                errorState.appendChild(errorContent);
            });

        };


    };

    const validateImage = (image) => {


        if (image.files.length > 0) {
            const file = image.files[0];

            if (file) {
                if ((file.type === "image/jpeg" || file.type === "image/png") || (file.type === "image/gif" || file.type === "image/jpg")) {
                    console.log('El archivo de imagen es valido');
                } else {
                    if (!errors.image) {
                        errors.image = [];
                    }
                    errors.image.push('El archivo no es una imagen en formato válido (GIF, JPG, PNG o JPEG)');
                }
            }

        }

        if (image.value.length === 0) {
            if (!errors.image) {
                errors.image = [];
            }
            errors.image.push('Agrega una imagen de tu producto');
        };

        if (errors.image.length > 0) {
            errors.image.forEach((error) => {
                const errorContent = document.createElement('li');
                errorContent.textContent = error;
                errorImage.appendChild(errorContent);
            });
        }



    };

    const validateDescription = (description) => {


        const alphanumeric = /^[0-9a-zA-Z]+$/;

        if (description.value.length < 190 && description.value.length > 0) {
            if (!errors.description) {
                errors.description = [];
            };
            errors.description.push('La descripcion es demasiado corta');
        };

        if (!alphanumeric.test(description.value) && description.value.length > 0) {
            if (!errors.description) {
                errors.description = [];
            };
            errors.description.push('La cadena no puede caracteres especiales @-/_+$ solo "numero y letras"');
        };

        if (description.value.length >= 400) {
            if (!errors.description) {
                errors.description = [];
            }
            errors.description.push('La descripcion no puede sobrepasar los 400 caracteres');
        };
        if (description.value.length <= 0) {
            if (!errors.description) {
                errors.description = [];
            }
            errors.description.push('Debes añadir una descripcion sobre tu producto');
        };

        if (errors.description.length > 0) {
            errors.description.forEach((error) => {
                const errorContent = document.createElement('li');
                errorContent.textContent = error;
                errorDescription.appendChild(errorContent);
            });

        };




    };

    const validatePrice = (price) => {


        if (price.value.length > 3) {
            if (!errors.price) {
                errors.price = [];
            }
            errors.price.push('El valor del producto es demasiado alto');
        };
        if (price.value.length <= 0) {
            if (!errors.price) {
                errors.price = [];
            }
            errors.price.push('Ingresa el valor del producto');
        };

        if (errors.price.length > 0) {
            errors.price.forEach((error) => {
                const errorContent = document.createElement('li');
                errorContent.textContent = error;
                errorPrice.appendChild(errorContent);
            });

        };
    




    };



    form.addEventListener('submit', (e) => {

        e.preventDefault();

        //Reinicio errors

        errors.name = [];
        errors.united = [];
        errors.brand = [];
        errors.color = [];
        errors.discount = [];
        errors.material = [];
        errors.state = [];
        errors.image = [];
        errors.description = [];
        errors.price = [];
        errors.category = [];



        errorName.textContent = '';
        errorUnited.textContent = '';
        errorBrand.textContent = '';
        errorColor.textContent = '';
        errorDiscount.textContent = '';
        errorMaterial.textContent = '';
        errorState.textContent = '';
        errorImage.textContent = '';
        errorDescription.textContent = '';
        errorPrice.textContent = '';
        errorCategory.textContent = '';



        //Functions validations
        validateName(e.target.name);
        validateUnited(e.target.united);
        validateBrand(e.target.brand);
        validateColor(e.target.color);
        validateDiscount(e.target.discount);
        validateMaterial(e.target.material);
        validateState(e.target.state);
        validateImage(e.target.image);
        validateDescription(e.target.descripcion);
        validatePrice(e.target.price);
        validateCategory(e.target.category);


        //Verifico si no hay errores
        const hasNoErrors = Object.values(errors).every(errorArray => errorArray.length === 0);

        if (hasNoErrors) {
            form.submit();
        }


    });

});