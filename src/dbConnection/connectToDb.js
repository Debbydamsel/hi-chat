const mongoose = require("mongoose");
require("dotenv").config();
const mongodb_connection_uri = process.env.MONGODB_CONNECTION_URI;

const ConnectionToDb = () => {
    mongoose.set('strictQuery', true);
    mongoose.connect(mongodb_connection_uri);

    mongoose.connection.on("connected", () => {
        console.log("connection to mongodb successful!");
    })

    mongoose.connection.on("error", (err) => {
        console.log("An Error occurred while trying to connect to mongodb" + err);
    })

    
}

module.exports = ConnectionToDb;