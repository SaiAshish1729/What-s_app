const express = require("express");
const { registerUser, userLogin, logout, getOtherUsers, getProfile } = require("../Conroller/userConrller");
const isAuthenticated = require("../Middlewares/Authentication");
const router = express.Router();

router.post("/user-registration", registerUser);
router.post("/login", userLogin);
router.get("/logout", logout);
router.get("/other-users", isAuthenticated, getOtherUsers);
router.get("/user-profile", isAuthenticated, getProfile);

module.exports = router 