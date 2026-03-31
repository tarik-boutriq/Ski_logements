const express = require('express');
const router = express.Router();
const { check, param } = require('express-validator');
const validate = require('../middlewares/validator');

const reservationsController = require('../controllers/reservationsController');

const reservationValidationRules = [
    check('logement_id').isMongoId().withMessage('L\'ID du logement doit être un identifiant MongoDB valide'),
    check('client_id').isMongoId().withMessage('L\'ID du client doit être un identifiant MongoDB valide'),
    check('start').notEmpty().withMessage('La date de début est obligatoire'),
    check('end').notEmpty().withMessage('La date de fin est obligatoire')
];

const idValidationRule = [
    param('id').isMongoId().withMessage('L\'identifiant de la réservation est invalide')
];

router.get('/', reservationsController.getReservation);
router.get('/:id', validate(idValidationRule), reservationsController.getReservationById);
router.post('/', validate(reservationValidationRules), reservationsController.createReservation);
router.put('/:id', validate([...idValidationRule, ...reservationValidationRules]), reservationsController.updateReservation);
router.delete('/:id', validate(idValidationRule), reservationsController.deleteReservation);

module.exports = router;