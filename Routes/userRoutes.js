const express = require("express");
const { registerUser, userLogin, logout, getOtherUsers } = require("../Conroller/userConrller");
const isAuthenticated = require("../Middlewares/Authentication");
const router = express.Router();

router.post("/user-registration", registerUser);
router.post("/login", userLogin);
router.get("/logout", logout);
router.get("/other-users", isAuthenticated, getOtherUsers)

module.exports = router