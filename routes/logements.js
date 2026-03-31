const express = require('express');
const router = express.Router();
const { check, param } = require('express-validator');
const validate = require('../middlewares/validator');

const logementsController = require('../controllers/logementsController');

const logementValidationRules = [
    check('nom').notEmpty().withMessage('Le nom du logement est obligatoire'),
    check('station').notEmpty().withMessage('La station est obligatoire'),
    check('prix_par_nuit').isInt({ gt: 0 }).withMessage('Le prix doit être un nombre positif'),
    check('capacite').isInt({ min: 1 }).withMessage('La capacité doit être au moins de 1 personne'),
    check('type').notEmpty().withMessage('Le type de logement est obligatoire'),
    check('description').optional().isString().withMessage('La description doit être une chaîne de caractères')
];

const idValidationRule = [
    param('id').isMongoId().withMessage('L\'identifiant du logement est invalide')
];

router.get('/', logementsController.getLogements);
router.get('/:id', validate(idValidationRule), logementsController.getLogementById);
router.post('/', validate(logementValidationRules), logementsController.createLogement);
router.put('/:id', validate([...idValidationRule, ...logementValidationRules]), logementsController.updateLogement);
router.delete('/:id', validate(idValidationRule), logementsController.deleteLogement);

module.exports = router;