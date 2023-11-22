
const isAuthenticatedSession = (req, res, next) => {
    console.log('Contenido de la sesión:', req.session);
    next(); // Asegúrate de llamar a next() para pasar al siguiente middleware o ruta
  };
  
  module.exports = isAuthenticatedSession;