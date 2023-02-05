const userSchema = require("mongose").Schema;

const bcrypt = require("bcrypt");


const userModel = new userSchema({
    firstName: {
        type: String,
        required: [true, "Please provide your First Name"]
    },
    lastName: {
        type: String,
        required: [true, "Please provide your Last Name"]
    },
    userName: {
        type: String,
        required: [true, "Please provide a userName"]
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


userModel.pre("save", async function(next) {
    user = this;
    const hash = bcrypt.hash(this.password, 10);
    this.password = hash;
    next()
})

userModel.methods.isValidPassword = async function(password) {
    const user = this;
    const comparePasswords = bcrypt.compare(password, user.password);
    return comparePasswords;
}

module.exports = mongoose.model("userSchema", userModel);