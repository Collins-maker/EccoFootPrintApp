const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
  restoreSession,
} = require("../controllers/authenticationControllers");
const authenticationRoutes = express.Router();

authenticationRoutes.post("/login", loginUser);

authenticationRoutes.post("/register", registerUser);
authenticationRoutes.get("/users", getAllUsers);
authenticationRoutes.get("/restore-session/:sessionIdentifier", restoreSession);

module.exports = authenticationRoutes;
