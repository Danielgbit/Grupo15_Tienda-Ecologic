import React, { useEffect } from 'react';

const PasswordConfig = () => {
  useEffect(() => {
    const passwordInput = document.querySelector('.input-passw-global');
    const viewOnPassword = document.querySelector('.view-password');
    const viewOffPassword = document.querySelector('.not-view-password');

    viewOnPassword.style.display = 'none';

    const handleViewOnPasswordClick = () => {
      viewOffPassword.style.display = 'block';
      viewOnPassword.style.display = 'none';
      passwordInput.type = 'password';
    };

    const handleViewOffPasswordClick = () => {
      viewOffPassword.style.display = 'none';
      viewOnPassword.style.display = 'block';
      passwordInput.type = 'text';
    };

    viewOnPassword.addEventListener('click', handleViewOnPasswordClick);
    viewOffPassword.addEventListener('click', handleViewOffPasswordClick);

    return () => {
      // Elimina los event listeners al desmontar el componente
      viewOnPassword.removeEventListener('click', handleViewOnPasswordClick);
      viewOffPassword.removeEventListener('click', handleViewOffPasswordClick);
    };
  }, []); // El array vacío significa que este efecto solo se ejecutará una vez al montar el componente

  return null; // No hay nada que renderizar
};

export default PasswordConfig;
