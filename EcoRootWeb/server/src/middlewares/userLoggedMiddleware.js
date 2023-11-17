const db = require('../database/models');

const userLoggedMiddleware = async (req, res, next) => {
  // Verifica si la cookie 'uEmail' está presente
  if (req.cookies.uEmail) {
    // Si está presente, busca el usuario correspondiente en la base de datos
    const userInCookie = await db.User.findOne({
      where: {
        email: req.cookies.uEmail.email,
      },
      raw: true,
    });

    // Si se encuentra un usuario, asigna su información a req.session.user
    if (userInCookie) {
      req.session.user = userInCookie;
    }
  }

  if (req.session.user) {
    res.locals.user = req.session.user;
  }

  next();
};

module.exports = userLoggedMiddleware;
