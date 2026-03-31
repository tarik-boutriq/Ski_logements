const express = require('express');
const router = express.Router();

const reservationsController = require('../controllers/reservationsController');

router.get('/', reservationsController.getReservation);

module.exports = router;