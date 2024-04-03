const express = require("express");
const { getAllUsers, registerUser } = require("../controllers/userControllers");
const { loginUser } = require("../controllers/authenticationControllers");

const userRoutes = express.Router();

userRoutes.get("/users", getAllUsers);

userRoutes.post("/", loginUser);

userRoutes.post("/users", registerUser);

module.exports = userRoutes;
