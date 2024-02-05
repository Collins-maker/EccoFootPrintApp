const express = require("express");
const { getAllUsers, registerUser } = require("../controllers/userControllers");

const userRoutes = express.Router();

userRoutes.get("/users", getAllUsers);

userRoutes.post("/users", registerUser);

module.exports = userRoutes;
