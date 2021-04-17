function loginLocals (req, res, next) {

    res.locals.userSession = false;
    
    if(req.session.loggedUser) {        
        res.locals.userSession = req.session.loggedUser
    } 

    next();
};

module.exports = loginLocals;