const express = require("express");
const { carbonFootprints, goals } = require("../controllers/carbonFootprints");

const footprintRoutes = express.Router();

footprintRoutes.post("/footprints", carbonFootprints);
footprintRoutes.post("/goals", goals);

module.exports = footprintRoutes;
