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


/**
 * @swagger
 * /logements:
 *   get:
 *     tags:
 *       - Logements
 *     summary: Récupérer tous les logements
 *     description: |
 *       Cette route permet de récupérer la liste de tous les logements.
 *       - Permet de filtrer par station, capacité, prix maximum, type ou nom.
 *       - Permet de trier par prix.
 *       - Si aucun logement n'est trouvé, une erreur 404 est renvoyée.
 *     parameters:
 *       - in: query
 *         name: station
 *         type: string
 *         description: Filtrer par station
 *       - in: query
 *         name: capacite
 *         type: integer
 *         description: Filtrer par capacité minimale
 *       - in: query
 *         name: prix_par_nuit
 *         type: integer
 *         description: Filtrer par prix maximum
 *       - in: query
 *         name: type
 *         type: string
 *         description: Filtrer par type de logement
 *       - in: query
 *         name: nom
 *         type: string
 *         description: Filtrer par nom (contient)
 *       - in: query
 *         name: tri_prix
 *         type: string
 *         description: Trier par prix (asc ou desc)
 *     responses:
 *       200:
 *         description: Liste des logements récupérée avec succès
 *       404:
 *         description: Aucun logement trouvé
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @swagger
 * /logements:
 *   post:
 *     tags:
 *       - Logements
 *     summary: Créer un nouveau logement
 *     description: |
 *       Cette route permet de créer un nouveau logement.
 *       - Vérifie si un logement avec le même nom existe déjà dans la même station.
 *       - Si oui, une erreur 409 est renvoyée.
 *       - Si non, le logement est créé.
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         description: Données du logement à créer
 *         schema:
 *           type: object
 *           properties:
 *             nom:
 *               type: string
 *             station:
 *               type: string
 *             prix_par_nuit:
 *               type: integer
 *             capacite:
 *               type: integer
 *             type:
 *               type: string
 *             description:
 *               type: string
 *     responses:
 *       201:
 *         description: Logement créé avec succès
 *       409:
 *         description: Un logement avec ce nom existe déjà dans cette station
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @swagger
 * /logements/{id}:
 *   get:
 *     tags:
 *       - Logements
 *     summary: Récupérer un logement par son identifiant
 *     description: |
 *       Cette route permet de récupérer un logement à partir de son identifiant.
 *       - Vérifie si le logement existe.
 *       - Si oui, il est retourné.
 *       - Si non, une erreur 404 est renvoyée.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Identifiant unique du logement
 *     responses:
 *       200:
 *         description: Logement trouvé
 *       404:
 *         description: Logement non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @swagger
 * /logements/{id}:
 *   put:
 *     tags:
 *       - Logements
 *     summary: Mettre à jour un logement
 *     description: |
 *       Cette route permet de modifier les informations d'un logement existant.
 *       - Vérifie si le logement existe.
 *       - Si oui, il est mis à jour.
 *       - Si non, une erreur 404 est renvoyée.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Identifiant unique du logement
 *       - in: body
 *         name: body
 *         required: true
 *         description: Données à mettre à jour
 *         schema:
 *           type: object
 *           properties:
 *             nom:
 *               type: string
 *             station:
 *               type: string
 *             prix_par_nuit:
 *               type: integer
 *             capacite:
 *               type: integer
 *             type:
 *               type: string
 *             description:
 *               type: string
 *     responses:
 *       200:
 *         description: Logement mis à jour
 *       404:
 *         description: Logement non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @swagger
 * /logements/{id}:
 *   delete:
 *     tags:
 *       - Logements
 *     summary: Supprimer un logement
 *     description: |
 *       Cette route permet de supprimer définitivement un logement à partir de son identifiant.
 *       - Vérifie d'abord si le logement existe.
 *       - Si oui, il est supprimé.
 *       - Si non, une erreur 404 est renvoyée.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Identifiant unique du logement
 *     responses:
 *       204:
 *         description: Logement supprimé avec succès
 *       404:
 *         description: Logement non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
