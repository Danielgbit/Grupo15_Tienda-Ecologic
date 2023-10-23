window.addEventListener('load', () => {

    const form = document.querySelector('.form-register');
    const first_name = document.querySelector('#first_name');
    const last_name = document.querySelector('#last_name');
    const username = document.querySelector('#username');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const image = document.querySelector('#image');
    const buttonSubmit = document.querySelector('.button-register');

    //Content ErrorsView
    const errorLastName = document.querySelector('.error-last-name');
    const errorFirstName = document.querySelector('.errorFirstName');
    const errorUserName = document.querySelector('.error-username');
    const errorEmail = document.querySelector('.error-email');
    const errorPassword = document.querySelector('.error-password');
    const errorCountry = document.querySelector('.error-country');



    //Level security Password
    const errorPasswordContent = document.createElement('li');
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

        if ((/[A-Z]/.test(e.target.value) && e.target.value.length > 6) && /\d/.test(e.target.value)){
            textSecurityPassword.textContent = 'Nivel: Aceptable'
            contentSecurityLevel.style.width = '90px'
        };

        if ((/[A-Z]/.test(e.target.value) && /[\W_]/.test(e.target.value))  && e.target.value.length > 10) {
            textSecurityPassword.textContent = 'Nivel: Segura'
            contentSecurityLevel.style.width = '150px'
        };

        if(e.target.value.length > 0){
            errorPasswordContent.textContent = ''
        }

    });


    // Object Errors
    const errors = {};

    //Regular expressions perzonalizada
    const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;


    const validateFirstName = (firstName) => {


        if (firstName.value.length < 4 && firstName.value.length > 0) {
            if (!errors.first_name) {
                errors.first_name = [];
            }
            errors.first_name.push('el nombre debe tener minimo 4 caracteres');
        };

        if (firstName.value.length <= 0) {
            if (!errors.first_name) {
                errors.first_name = [];
            }
            errors.first_name.push('debes completar este campo');
        };
        if (firstName.value.length > 20) {
            if (!errors.first_name) {
                errors.first_name = [];
            }
            errors.first_name.push('el nombre es demasiado largo');
        };
        if (specialCharacters.test(firstName.value)) {
            if (!errors.first_name) {
                errors.first_name = [];
            }
            errors.first_name.push('El nombre no debe contener caracteres especiales @-/_+$');
        };

        if (errors.first_name.length) {
            errorFirstName.textContent = '';

            errors.first_name.forEach((error) => {
                const errorContent = document.createElement('li');

                errorContent.textContent = error;

                errorFirstName.appendChild(errorContent);
            })
        }
    };

    const validateLastName = (lastName) => {


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


        if (errors.last_name.length) {
            errorLastName.textContent = '';

            errors.last_name.forEach((error) => {
                const errorContent = document.createElement('li');
                errorContent.textContent = error;
                errorLastName.appendChild(errorContent);
            })
        }
    };

    const validateUserName = (userName) => {


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


        if (errors.username.length) {
            errorUserName.textContent = '';

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

        if (email.value.length < 4 && email.value.length > 0) {
            if (!errors.email) {
                errors.email = [];
            }
            errors.email.push('el email debe tener almenos 4 caracteres');
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

        if (errors.email.length >= 0) {
            errorEmail.textContent = '';

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

        if (errors.password.length >= 0) {
            errorPassword.textContent = '';

            errors.password.forEach((error) => {
                errorPasswordContent.textContent = error;
                errorPassword.appendChild(errorContent);
            });
        }

    };

    const validateCountry = (country) => {

        if (country.value.length === 0) {
            if (!errors.country) {
                errors.country = [];
            }
            errors.country.push('debes completar este campo');
        };

        if (errors.country.length >= 0) {
            errorPassword.textContent = '';

            errors.country.forEach((error) => {
                const errorContent = document.createElement('li');
                errorContent.textContent = error;
                errorCountry.appendChild(errorContent);
            });
        }

    }







    form.addEventListener('submit', (e) => {

        e.preventDefault();

        //Reinicio errors
        errors.first_name = [];
        errors.last_name = [];
        errors.username = [];
        errors.email = [];
        errors.password = [];
        errors.country = [];


        //Functions validations
        validateFirstName(e.target.first_name);
        validateLastName(e.target.last_name);
        validateUserName(e.target.username);
        validateEmail(e.target.email);
        validatePassword(e.target.password);
        validateCountry(e.target.country);


    })

});