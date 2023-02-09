const express = require("express");
const chatRouter = express.Router();

chatRouter.get("/", (req, res) => {
    res.render("chats");
})

chatRouter.post("/", (req, res) => {
    res.render("chats");
})


module.exports = chatRouter;