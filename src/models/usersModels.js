const mongoose = require("mongoose");
const userSchema = mongoose.Schema;


const userModel = new userSchema({
    username: {
        type: String,
        required: [true, "Please provide a userName"],
        unique: [true, "This username already exists!"]
    },
    email: {
        type: String,
        unique: [true, "This email already exists!"],
        required: true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"]
    }
    
}, {timestamps: true});

module.exports = mongoose.model("appUser", userModel);