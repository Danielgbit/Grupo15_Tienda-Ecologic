const isAuthenticatedPassword = (req, res, next) => {
// Antes de tus validaciones
        console.log('Request Body:', req.body);
        console.log('Request File:', req.file);
        next();
  };
  
  module.exports = isAuthenticatedPassword;