const express = require('express');
const router = express.Router();

const logementsController = require('../controllers/logementsController');

router.get('/', logementsController.getLogements);
router.post('/', logementsController.createLogement);
router.get('/:id', logementsController.getLogementById);
router.put('/:id', logementsController.updateLogement);
router.delete('/:id', logementsController.deleteLogement);
module.exports = router;