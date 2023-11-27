window.addEventListener('load', () => { 

    const form = document.querySelector('.form-login');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');

    const errorEmail = document.querySelector('.error-email');
    const errorPassword = document.querySelector('.error-password');



    const errors = {};


    email.addEventListener('input', (e) => {

        const emailRegularExpresion = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
        const errorContent = document.createElement('li');


        if (!emailRegularExpresion.test(e.target.value) && e.target.value.length > 0) {
            errorEmail.textContent = '';
            errorContent.textContent = 'El correo electrónico no es válido';
            errorEmail.appendChild(errorContent);
        } else {
            errorEmail.textContent = '';
        };

        if (e.target.value.length > 30) {
            errorEmail.textContent = '';
            errorContent.textContent = 'El email no puede sobrepasar los 30 caracteres';
            errorEmail.appendChild(errorContent);
        } else if (e.target.value.length < 10 && e.target.value.length > 0) {
            errorEmail.textContent = '';
            errorContent.textContent = 'El email debe tener almenos 10 caracteres';
            errorEmail.appendChild(errorContent);
        };
    });

    password.addEventListener('input', (e) => {

        const errorContent = document.createElement('li');

        if (e.target.value.length > 30) {
            errorPassword.textContent = '';
            errorContent.textContent = 'La contraseña no puede sobrepasar los 30 caracteres';
            errorPassword.appendChild(errorContent);
        } else {
            errorPassword.textContent = '';
        };

    });


    const validateEmail = (email) => {

        const emailRegularExpresion = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

        if (!emailRegularExpresion.test(email.value) && email.value.length > 0) {
            if (!errors.email) {
                errors.email = [];
            }
            errors.email.push('El correo electrónico no es válido');
        };

        if (email.value.length < 10 && email.value.length > 0) {
            if (!errors.email) {
                errors.email = [];
            }
            errors.email.push('El email debe tener almenos 10 caracteres');
        };
        if (email.value.length > 30) {
            if (!errors.email) {
                errors.email = [];
            }
            errors.email.push('El email no puede sobrepasar los 30 caracteres');
        };
        if (email.value.length <= 0) {
            if (!errors.email) {
                errors.email = [];
            }
            errors.email.push('Debes agregar un email');
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


        if (password.value.length > 30) {
            if (!errors.password) {
                errors.password = [];
            }
            errors.password.push('La contraseña no puede sobrepasar los 30 caracteres');
        };
        if (password.value.length <= 0) {
            if (!errors.password) {
                errors.password = [];
            }
            errors.password.push('La contraseña es requerida');
        };

        if (errors.password.length > 0) {
            errors.password.forEach((error) => {
                const errorContent = document.createElement('li');
                errorContent.textContent = error;
                errorPassword.appendChild(errorContent);
            });

        };


    };

    form.addEventListener('submit', (e) => {

        e.preventDefault();

        //Reinicio errors

        errors.email = [];
        errors.password = [];

        
        if (errorEmail) {
            errorEmail.textContent = '';
        }
        
        if (errorPassword) {
            errorPassword.textContent = '';
        }
        //Functions validations

        validateEmail(e.target.email);
        validatePassword(e.target.password);


        //Verifico si no hay errores
        const hasNoErrors = Object.values(errors).every(errorArray => errorArray.length === 0);

        if (hasNoErrors) {
            form.submit();
        }


    });

});