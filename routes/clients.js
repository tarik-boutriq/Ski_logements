const express = require('express');
const router = express.Router();
const clientsController = require('../controllers/clientsController');

router.get('/', clientsController.getclients); 

module.exports = router;