const express = require("express");
const expressLayOuts = require("express-ejs-layouts");
const passport = require("passport");
const app = express();
const path = require("path");
const http = require("http");
const server = http.createServer(app);
require("dotenv").config();
const port = process.env.PORT;
const { Server } = require("socket.io");
const io = new Server(server);
const bodyParser = require("body-parser");
const connectionToDb = require("./src/dbConnection/connectToDb");
const authRouter = require("./src/routes/authRoute");
const chatRouter = require("./src/routes/chatRoute");
//require("./src/controllers/authController");


//EJS
app.use(expressLayOuts);
app.set('views', path.join(__dirname, "src/views"));
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.use(express.static("public"));

//connection to db
connectionToDb();

app.use("/", authRouter);
app.use("/chats", chatRouter);


io.on("connection", (socket) => {
    console.log("User connected!");

    socket.on("chat message", (message) => {
        console.log("message " + message);
        socket.broadcast.emit("chat message", message);
    })

    socket.on("disconnect", () => {
        console.log("User disconected!");
    })
})





server.listen(port, () => {
    console.log(`listening on *:${port}`);
  });

