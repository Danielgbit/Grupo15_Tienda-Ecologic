window.addEventListener('load', () => {

    const form = document.querySelector('.form-register');
    const first_name = document.querySelector('#first_name');
    const last_name = document.querySelector('#last_name');
    const username = document.querySelector('#username');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const avatar = document.querySelector('#image');
    const buttonSubmit = document.querySelector('.button-register');

    //Content ErrorsView
    const errorLastName = document.querySelector('.error-last-name');
    const errorFirstName = document.querySelector('.errorFirstName');
    const errorUserName = document.querySelector('.error-username');
    const errorEmail = document.querySelector('.error-email');
    const errorPassword = document.querySelector('.error-password');
    const errorCountry = document.querySelector('.error-country');
    const errorCity = document.querySelector('.error-city');
    const errorAddress = document.querySelector('.error-address');
    const errorBirthDate = document.querySelector('.error-birth-date');
    const errorGender = document.querySelector('.error-gender');
    const errorAvatar = document.querySelector('.error-avatar');



    //Level security Password
    const contentSecurityLevel = document.querySelector('.security-level');
    const textSecurityPassword = document.querySelector('.text-security-password');

    contentSecurityLevel.classList.remove('security-level');

    password.addEventListener('input', (e) => {

        if (e.target.value.length > 0) {
            textSecurityPassword.textContent = 'Nivel: vulnerable';
            contentSecurityLevel.classList.add('security-level');

        } else {
            textSecurityPassword.textContent = '';
            contentSecurityLevel.classList.remove('security-level');
        };

        if (/[A-Z]/.test(e.target.value)) {
            textSecurityPassword.textContent = 'Nivel: poco segura'
            contentSecurityLevel.style.width = '70px'
        } else {
            contentSecurityLevel.style.width = '50px'
        };

        if ((/[A-Z]/.test(e.target.value) && e.target.value.length > 6) && /\d/.test(e.target.value)) {
            textSecurityPassword.textContent = 'Nivel: Aceptable'
            contentSecurityLevel.style.width = '90px'
        };

        if ((/[A-Z]/.test(e.target.value) && /[\W_]/.test(e.target.value)) && e.target.value.length > 10) {
            textSecurityPassword.textContent = 'Nivel: Segura'
            contentSecurityLevel.style.width = '150px'
        };

        if (e.target.value.length > 0) {
            errorPassword.textContent = '';
        }



    });

    first_name.addEventListener('input', (e) => {

        const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;

        if (specialCharacters.test(e.target.value)) {
            const errorContent = document.createElement('li');
            errorContent.textContent = 'No puedes agregar caracteres especiales';
            errorFirstName.appendChild(errorContent);
        };
    })

    avatar.addEventListener('change', (e) => {

        const errorContent = document.createElement('li');
        const file = e.target.files[0];

        if (file) {
            // Verifica si el tipo de archivo es una imagen en formato JPG o PNG
            if ((file.type === "image/jpeg" || file.type === "image/png") || (file.type === "image/gif" || file.type === "image/jpg")) {
                errorAvatar.textContent = '';
            }else {
                errorContent.textContent = 'El archivo no es una imagen en formato válido (GIF, JPG, PNG o JPEG)';
                errorAvatar.appendChild(errorContent);
            }
          };
    });


    // Object Errors
    const errors = {};

    //Regular expressions perzonalizada


    const validateFirstName = (firstName) => {

        const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;

        if (firstName.value.length < 4 && firstName.value.length > 0) {
            if (!errors.first_name) {
                errors.first_name = [];
            };
            errors.first_name.push('el nombre debe tener minimo 4 caracteres');
        };

        if (firstName.value.length <= 0) {
            if (!errors.first_name) {
                errors.first_name = [];
            };
            errors.first_name.push('debes completar este campo');
        };
        if (firstName.value.length > 20) {
            if (!errors.first_name) {
                errors.first_name = [];
            };
            errors.first_name.push('el nombre es demasiado largo');
        };
        if (specialCharacters.test(firstName.value)) {
            if (!errors.first_name) {
                errors.first_name = [];
            };
            errors.first_name.push('El nombre no debe contener caracteres especiales @-/_+$');
        };

        if (errors.first_name.length > 0) {
            errors.first_name.forEach((error) => {
                const errorContent = document.createElement('li');
                errorContent.textContent = error;
                errorFirstName.appendChild(errorContent);
            })
        }
    };

    const validateLastName = (lastName) => {

        const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;


        if (lastName.value.length < 4 && lastName.value.length > 0) {
            if (!errors.last_name) {
                errors.last_name = [];
            }
            errors.last_name.push('el apellido debe tener minimo 4 caracteres');
        };
        if (lastName.value.length > 20) {
            if (!errors.last_name) {
                errors.last_name = [];
            }
            errors.last_name.push('el apellido es demasiado largo');
        };
        if (lastName.value.length <= 0) {
            if (!errors.last_name) {
                errors.last_name = [];
            }
            errors.last_name.push('debes completar este campo');
        };
        if (specialCharacters.test(lastName.value)) {
            if (!errors.last_name) {
                errors.last_name = [];
            }
            errors.last_name.push('El apellido no debe contener caracteres especiales @-/_+$');
        }


        if (errors.last_name.length > 0) {
            errors.last_name.forEach((error) => {
                const errorContent = document.createElement('li');
                errorContent.textContent = error;
                errorLastName.appendChild(errorContent);
            })
        }
    };

    const validateUserName = (userName) => {

        const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;


        if (userName.value.length < 3 && userName.value.length > 0) {
            if (!errors.username) {
                errors.username = [];
            }
            errors.username.push('el nombre de usuario debe tener minimo 3 caracteres');
        };
        if (userName.value.length > 8) {
            if (!errors.username) {
                errors.username = [];
            }
            errors.username.push('el nombre de usuario no puede sobrepasar los 8 caracteres');
        };
        if (userName.value.length <= 0) {
            if (!errors.username) {
                errors.username = [];
            }
            errors.username.push('debes completar este campo');
        };
        if (specialCharacters.test(userName.value)) {
            if (!errors.username) {
                errors.username = [];
            }
            errors.username.push('El nombre de usuario no debe contener caracteres especiales @-/_+$');
        }


        if (errors.username.length > 0) {
            errors.username.forEach((error) => {
                const errorContent = document.createElement('li');
                errorContent.textContent = error;
                errorUserName.appendChild(errorContent);
            })
        }
    };

    const validateEmail = (email) => {

        const emailRegularExpresion = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

        if (!emailRegularExpresion.test(email.value) && email.value.length > 0) {
            if (!errors.email) {
                errors.email = [];
            }
            errors.email.push('el email debe tener el siguiente formato user@dominio.com');
        };

        if (email.value.length < 10 && email.value.length > 0) {
            if (!errors.email) {
                errors.email = [];
            }
            errors.email.push('el email debe tener almenos 10 caracteres');
        };
        if (email.value.length > 20) {
            if (!errors.email) {
                errors.email = [];
            }
            errors.email.push('el nombre de usuario no puede sobrepasar los 20 caracteres');
        };
        if (email.value.length <= 0) {
            if (!errors.email) {
                errors.email = [];
            }
            errors.email.push('debes completar este campo');
        };

        if (errors.email.length > 0) {
            errors.email.forEach((error) => {
                const errorContent = document.createElement('li');
                errorContent.textContent = error;
                errorEmail.appendChild(errorContent);
            });
        }

    };

    const validatePassword = (password) => {


        if (!/[A-Z]/.test(password.value) && password.value.length > 8) {
            if (!errors.password) {
                errors.password = [];
            }
            errors.password.push('debe contener al menos una letra mayuscula');
        }

        if (password.value.length < 10 && password.value.length > 0) {
            if (!errors.password) {
                errors.password = [];
            }
            errors.password.push('la contraseña debe tener almenos 10 caracteres');
        };
        if (password.value.length > 30) {
            if (!errors.password) {
                errors.password = [];
            }
            errors.password.push('la contraseña no puede sobrepasar los 30 caracteres');
        };
        if (password.value.length <= 0) {
            if (!errors.password) {
                errors.password = [];
            }
            errors.password.push('debes completar este campo');
        };

        if (errors.password.length > 0) {
            errors.password.forEach((error) => {
                const errorContent = document.createElement('li');
                errorContent.textContent = error;
                errorPassword.appendChild(errorContent);
            });

        };


    };

    const validateCountry = (country) => {

        if (country.value.length === 0) {
            if (!errors.country) {
                errors.country = [];
            }
            errors.country.push('debes completar este campo');
        };

        if (errors.country.length > 0) {
            errors.country.forEach((error) => {
                const errorContent = document.createElement('li');
                errorContent.textContent = error;
                errorCountry.appendChild(errorContent);
            });
        }

    };

    const validateCity = (city) => {


        const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;


        if (city.value.length === 0) {
            if (!errors.city) {
                errors.city = [];
            }
            errors.city.push('debes completar este campo');
        };

        if (city.value.length < 4 && city.value.length > 0) {
            if (!errors.city) {
                errors.city = [];
            }
            errors.city.push('el nombre de usuario debe tener minimo 4 caracteres');
        };
        if (city.value.length > 15) {
            if (!errors.city) {
                errors.city = [];
            }
            errors.city.push('el nombre de usuario no puede sobrepasar los 15 caracteres');
        };

        if ((specialCharacters.test(city.value) || !/^[^0-9]+$/.test(city.value)) && city.value.length > 0) {
            if (!errors.city) {
                errors.city = [];
            }
            errors.city.push('No debe contener numeros o caracteres especiales @-/_+$');
        };


        if (errors.city.length > 0) {
            errors.city.forEach((error) => {
                const errorContent = document.createElement('li');
                errorContent.textContent = error;
                errorCity.appendChild(errorContent);
            });
        }

    };

    const validateAddress = (address) => {

        const regex = /^(?=.*\d)(?=.*#)(?=.*[a-zA-Z]).+$/;

        if (address.value.length === 0) {
            if (!errors.address) {
                errors.address = [];
            }
            errors.address.push('debes completar este campo');
        };

        if (address.value.length < 5 && address.value.length > 0) {
            if (!errors.address) {
                errors.address = [];
            }
            errors.address.push('el nombre de usuario debe tener minimo 5 caracteres');
        };
        if (address.value.length > 30) {
            if (!errors.address) {
                errors.address = [];
            }
            errors.address.push('el nombre de usuario no puede sobrepasar los 30 caracteres');
        };
        if ((!regex.test(address.value) && address.value.length > 3)) {
            errors.address.push('La direccion debe contener almenos un # y un numero de domicilio.');
        }


        if (errors.address.length > 0) {
            errors.address.forEach((error) => {
                const errorContent = document.createElement('li');
                errorContent.textContent = error;
                errorAddress.appendChild(errorContent);
            });
        }

    };

    const validateBirthDate = (birthDate) => {


        if (new Date(birthDate.value) > new Date()) {
            if (!errors.birthDate) {
                errors.birthDate = [];
            }
            errors.birthDate.push('La fecha de nacimiento no puede ser posterior a la fecha actual');
        };
        if (birthDate.value.length === 0) {
            if (!errors.birthDate) {
                errors.birthDate = [];
            }
            errors.birthDate.push('debes completar este campo');
        };
        if (errors.birthDate.length > 0) {
            errors.birthDate.forEach((error) => {
                const errorContent = document.createElement('li');
                errorContent.textContent = error;
                errorBirthDate.appendChild(errorContent);
            });
        }

    };

    const validateGender = (gender) => {


        if (gender.value.length === 0) {
            if (!errors.gender) {
                errors.gender = [];
            }
            errors.gender.push('debes completar este campo');
        };

        if (errors.gender.length > 0) {
            errors.gender.forEach((error) => {
                const errorContent = document.createElement('li');
                errorContent.textContent = error;
                errorGender.appendChild(errorContent);
            });
        }

    };

    const validateAvatar = (avatar) => {

        if (avatar.files.length > 0) {
          const file = avatar.files[0];
      
          if (file) {
            if ((file.type === "image/jpeg" || file.type === "image/png") || (file.type === "image/gif" || file.type === "image/jpg")) {
                console.log('el archivo de imagen es valido');
            }else {               
                if (!errors.avatar) {
                    errors.avatar = [];
                }
                errors.avatar.push('El archivo no es una imagen en formato válido (GIF, JPG, PNG o JPEG)');
            }
          }
        
        }

        if (avatar.value.length === 0) {
            if (!errors.avatar) {
                errors.avatar = [];
            }
            errors.avatar.push('Agrega una imagen');
        };

        if (errors.avatar.length > 0) {
            errors.avatar.forEach((error) => {
                const errorContent = document.createElement('li');
                errorContent.textContent = error;
                errorAvatar.appendChild(errorContent);
            });
        }
        
    };

    
    form.addEventListener('submit', (e) => {
        
        e.preventDefault();
        
        
        //Reinicio errors
        errors.country = [];
        errors.email = [];
        errors.first_name = [];
        errors.last_name = [];
        errors.password = [];
        errors.username = [];
        errors.city = [];
        errors.address = [];
        errors.birthDate = [];
        errors.gender = [];
        errors.avatar = [];

        
        
        errorFirstName.textContent = '';
        errorLastName.textContent = '';
        errorUserName.textContent = '';
        errorEmail.textContent = '';
        errorPassword.textContent = '';
        errorCountry.textContent = '';
        errorCity.textContent = '';
        errorAddress.textContent = '';
        errorBirthDate.textContent = '';
        errorGender.textContent = '';
        errorAvatar.textContent = '';
        
        

        //Functions validations
        validateFirstName(e.target.first_name);
        validateLastName(e.target.last_name);
        validateUserName(e.target.username);
        validateEmail(e.target.email);
        validatePassword(e.target.password);
        validateCountry(e.target.country);
        validateCity(e.target.city);
        validateAddress(e.target.address);
        validateBirthDate(e.target.birthDate);
        validateGender(e.target.gender);
        validateAvatar(e.target.image);
        
        //Verifico si no hay errores
        const hasNoErrors = Object.values(errors).every(errorArray => errorArray.length === 0);
    
        if (hasNoErrors) {
            form.submit();
          }


    })



    });