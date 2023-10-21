window.addEventListener('load', () => {

    const form = document.querySelector('.form-register');
    const first_name = document.querySelector('#first_name');
    const errorFirstName = document.querySelector('.errorFirstName');
    const last_name = document.querySelector('#last_name');
    const errorLastName = document.querySelector('.error-last-name');
    const username = document.querySelector('#username');
    const email = document.querySelector('#email');
    const password = document.querySelector('#password');
    const image = document.querySelector('#image');
    const buttonSubmit = document.querySelector('.button-register');
    
    
    // Errores
    const errors = {};

    const specialCharacters = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\]/;


    const validateFirstName = (firstName) => {


        if (firstName.value.length < 4) {
            if (!errors.first_name) {
                errors.first_name = [];
            }
            errors.first_name.push('el nombre debe tener minimo 4 caracteres');
        };
        if (specialCharacters.test(firstName.value)) {
            if (!errors.first_name) {
                errors.first_name = [];
            }
            errors.first_name.push('El nombre no debe contener caracteres especiales @-/_+$');
        }   

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


        if (lastName.value.length < 4) {
            if (!errors.last_name) {
                errors.last_name = [];
            }
            errors.last_name.push('el apellido debe tener minimo 4 caracteres');
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
    }


    const validateUserName = (userName) => {



        if (userName.value.length < 3) {
            if (!errors.username) {
                errors.username = [];
            }
            errors.username.push('el nombre de usuario debe tener minimo 3 caracteres');
        };
        if (specialCharacters.test(userName.value)) {
            if (!errors.username) {
                errors.username = [];
            }
            errors.username.push('El nombre de usuario no debe contener caracteres especiales @-/_+$');
        }


        if (errors.username.length) {
            errorLastName.textContent = '';

            errors.username.forEach((error) => {
                const errorContent = document.createElement('li');

                errorContent.textContent = error;

                errorLastName.appendChild(errorContent);
            })
        }
    }



    form.addEventListener('submit', (e) => {

        e.preventDefault();

        //FUNCION FIRST NAME

        errors.first_name = []; //Reinicio errors
        errors.last_name = []; //Reinicio errors

        validateFirstName(e.target.first_name);

        validateLastName(e.target.last_name);



    })

});