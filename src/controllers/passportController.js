const passport = require("passport");
const User = require("../models/usersModels");
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

passport.use(new localStrategy(
    {
        usernameField: "email",
    }, (email, password, done) => {
        User.findOne({email: email}).then(user => {
            //check if the email exists
            if (!user) return done(null, false, {message: "This email doesnt exist, please sign up!"});

            //comparing the passwords
            bcrypt.compare(password, user.password, (err, isValidPassword) => {
                if (err) throw err;

                if (isValidPassword) {
                    return done(null, user)
                } else {
                    return done(null, false, {message: "This password is incorrect, Please enter the correct password!"})
                }
             })
        }).catch(err => console.log(err));
    }));

    passport.serializeUser(function(user, cb) {
        process.nextTick(function() {
          cb(null, { id: user.id, email: user.email });
        });
      });
      
      passport.deserializeUser(function(user, cb) {
        process.nextTick(function() {
          return cb(null, user);
        });
      });





module.exports = passport;