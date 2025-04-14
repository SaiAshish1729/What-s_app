const express = require("express");
const { registerUser, userLogin, logout } = require("../Conroller/userConrller");
const router = express.Router();

router.post("/user-registration", registerUser);
router.post("/login", userLogin);
router.get("/logout", logout)

module.exports = router