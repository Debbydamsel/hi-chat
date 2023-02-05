const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
require("dotenv").config();
const port = process.env.PORT;
const joinPath = path.join(__dirname, "index.html");
const { Server } = require("socket.io");

const io = new Server(server);

app.get("/", (req, res) => {
    res.sendFile(joinPath);
})

io.on("connection", (socket) => {
    console.log("User connected!");

    socket.on("chat message", (message) => {
        console.log("message " + message);
        io.emit("chat message", message);
    })

    socket.on("disconnect", () => {
        console.log("User disconected!");
    })
})





server.listen(port, () => {
    console.log(`listening on *:${port}`);
  });

