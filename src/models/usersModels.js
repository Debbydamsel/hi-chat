const mongoose = require("mongoose");
const userSchema = mongoose.Schema;


const userModel = new userSchema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
    
}, {timestamps: true});

module.exports = mongoose.model("appUser", userModel);