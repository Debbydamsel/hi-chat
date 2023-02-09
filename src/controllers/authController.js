const auth = {
    ensureAuthenticated: (req, res, next) => {
        if (req.isAuthenticated()) {
            return next();
        }
        req.flash("error_msg", "You have to signup or login to chat!");
        res.redirect("/");
    }
}


module.exports = auth;