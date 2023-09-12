const userModel = require('../models/usersModels');

const userLoggedMiddleware = (req, res, next) => {
    const email = req.cookies.uEmail;
    let userInCookie = userModel.findByEmail(email);

    if (userInCookie) {
        req.session.user = userInCookie;
    }


    if (req.session.user) {
        res.locals.user = req.session.user;
    }

    next();
};

module.exports = userLoggedMiddleware;
