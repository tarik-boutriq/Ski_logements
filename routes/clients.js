const express = require('express');
const router = express.Router();

const clientsController = require('../controllers/clientsController');

router.get('/', clientsController.getclients); 
router.post('/', clientsController.createClient);
router.get('/:id', clientsController.getClientById);
router.put('/:id', clientsController.updateClient);
router.delete('/:id', clientsController.deleteClient);
module.exports = router;