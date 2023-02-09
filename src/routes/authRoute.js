const express = require("express");
const passport = require("passport");
const authRouter = express.Router();
require("dotenv").config();
const secret_key = process.env.SECRET_KEY;
const userModel = require("../models/usersModels");
const bcrypt = require("bcryptjs");
//importing the controller that has passport sign up 
//require("../controllers/authController");

authRouter.get("/", (req, res) => {
    res.render("welcome");
})

authRouter.get("/signUp", (req, res) => {
    res.render("signUp");
});


authRouter.get("/signIn", (req, res) => {
    res.render("signIn");
});


authRouter.post("/signUp", (req, res, next) => {
    const {username, email, password} = req.body;

    let errors = [];
    //check that all fields are filled
    if (!username || !email || !password) {
        errors.push({msg: "Please fill in all fields!"});
    }

    //check length of password
    if(password.length < 5) {
        errors.push({msg: "Password should be at least 5 characters!"})
    }

    if (errors.length > 0) {
        res.render("signUp", {errors /*username, email, password*/});
    } else {
        //note that this doesnt work with async/await use .then istead
        userModel.findOne({email: email})
        .then(user => {
        if (user) {
            errors.push({message: "This email already exists!"});
            res.redirect("/signUp", {errors});
        } else {
            const newUser = new userModel({username,email, password});

            //hash the user's password

            bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash;

                newUser.save()
                .then(user => {
                    res.redirect("/signIn");
                })
                .catch(err => console.log(err))
            }))
            

        }
       })
    } 
});



module.exports = authRouter;

