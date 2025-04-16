const express = require("express");
const { sendMessage, getMessage } = require("../Conroller/messageController");
const isAuthenticated = require("../Middlewares/Authentication");
const router = express.Router();

router.post("/send-message/:id", isAuthenticated, sendMessage);
router.get("/get-messages/:id", isAuthenticated, getMessage)

module.exports = router