window.addEventListener('load', () => {
    //Password config view
    const passwordInput = document.querySelector('.input-passw-global');
    const viewOnPassword = document.querySelector('.view-password');
    const viewOffPassword = document.querySelector('.not-view-password');

    viewOnPassword.style.display = 'none';


    viewOnPassword.addEventListener('click', () => {

        viewOffPassword.style.display = 'block';
        viewOnPassword.style.display = 'none';
        passwordInput.type = 'password';
        
    });
    
    
    viewOffPassword.addEventListener('click', () => {
        
        viewOffPassword.style.display = 'none';
        viewOnPassword.style.display = 'block';
        passwordInput.type = 'text';
        
    })

    console.log(viewOffPassword);

});