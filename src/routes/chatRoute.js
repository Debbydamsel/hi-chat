const express = require("express");
const chatRouter = express.Router();
const auth = require("../controllers/authController");

chatRouter.get("/", (req, res) => {
    res.render("chats");
})

chatRouter.post("/", (req, res) => {
    res.render("chats");
})


module.exports = chatRouter;