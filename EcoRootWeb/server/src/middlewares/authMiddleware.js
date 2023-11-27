const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
      // Si hay un usuario en la sesión, se considera autenticado
      return next();
    } else {
      // Si no hay un usuario en la sesión, se redirige al usuario al login u otra página
      return res.status(401).json({ error: 'No autenticado' });
    }
  };
  
  module.exports = isAuthenticated;