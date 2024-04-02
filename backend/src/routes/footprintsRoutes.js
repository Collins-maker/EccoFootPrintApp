const express = require('express');
const { carbonFootprints } = require('../controllers/carbonFootprints');

const footprintRoutes = express.Router();

footprintRoutes.post('/footprints/:UserID', carbonFootprints);

module.exports = footprintRoutes;
