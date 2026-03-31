const express = require('express');
const router = express.Router();
const { check, param } = require('express-validator');
const validate = require('../middlewares/validator');

const clientsController = require('../controllers/clientsController');

const clientValidationRules = [
    check('nom_de_client').notEmpty().withMessage('Le nom du client est obligatoire'),
    check('prenom_de_client').notEmpty().withMessage('Le prénom du client est obligatoire'),
    check('email').isEmail().withMessage('Un email valide est obligatoire'),
    check('numero').isInt().withMessage('Le numéro doit être un nombre valide'),
    check('age').notEmpty().withMessage('L\'âge est obligatoire')
];

const idValidationRule = [
    param('id').isMongoId().withMessage('L\'identifiant du client est invalide')
];

router.get('/', clientsController.getclients);
router.get('/:id', validate(idValidationRule), clientsController.getClientById);
router.post('/', validate(clientValidationRules), clientsController.createClient);
router.put('/:id', validate([...idValidationRule, ...clientValidationRules]), clientsController.updateClient);
router.delete('/:id', validate(idValidationRule), clientsController.deleteClient);

module.exports = router;