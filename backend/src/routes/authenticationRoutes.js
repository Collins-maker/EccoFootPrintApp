const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/authenticationControllers");
const authenticationRoutes = express.Router();

authenticationRoutes.post("/login", loginUser);

authenticationRoutes.post("/register", registerUser);
authenticationRoutes.get("/users", getAllUsers);

module.exports = authenticationRoutes;
