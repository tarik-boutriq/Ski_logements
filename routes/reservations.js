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

/**
 * @swagger
 * /reservations:
 *   get:
 *     tags:
 *       - Reservations
 *     summary: Récupérer toutes les réservations
 *     description: |
 *       Cette route permet de récupérer la liste de toutes les réservations.
 *       - Permet de filtrer par logement ou par client.
 *       - Retourne aussi les informations du logement et du client associés.
 *       - Si aucune réservation n'est trouvée, une erreur 404 est renvoyée.
 *     parameters:
 *       - in: query
 *         name: logement_id
 *         type: string
 *         description: Filtrer par identifiant de logement
 *       - in: query
 *         name: client_id
 *         type: string
 *         description: Filtrer par identifiant de client
 *     responses:
 *       200:
 *         description: Liste des réservations récupérée avec succès
 *       404:
 *         description: Aucune réservation trouvée
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @swagger
 * /reservations:
 *   post:
 *     tags:
 *       - Reservations
 *     summary: Créer une nouvelle réservation
 *     description: |
 *       Cette route permet de créer une nouvelle réservation.
 *       - Vérifie si une réservation existe déjà pour le même logement et les mêmes dates.
 *       - Si oui, une erreur 409 est renvoyée.
 *       - Si non, la réservation est créée.
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         description: Données de la réservation à créer
 *         schema:
 *           type: object
 *           properties:
 *             logement_id:
 *               type: string
 *             client_id:
 *               type: string
 *             start:
 *               type: string
 *             end:
 *               type: string
 *     responses:
 *       201:
 *         description: Réservation créée avec succès
 *       409:
 *         description: Ce logement est déjà réservé pour ces dates
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @swagger
 * /reservations/{id}:
 *   get:
 *     tags:
 *       - Reservations
 *     summary: Récupérer une réservation par son identifiant
 *     description: |
 *       Cette route permet de récupérer une réservation à partir de son identifiant.
 *       - Retourne aussi les informations du logement et du client associés.
 *       - Si la réservation n'existe pas, une erreur 404 est renvoyée.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Identifiant unique de la réservation
 *     responses:
 *       200:
 *         description: Réservation trouvée
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @swagger
 * /reservations/{id}:
 *   put:
 *     tags:
 *       - Reservations
 *     summary: Mettre à jour une réservation
 *     description: |
 *       Cette route permet de modifier les informations d'une réservation existante.
 *       - Vérifie si la réservation existe.
 *       - Si oui, elle est mise à jour.
 *       - Si non, une erreur 404 est renvoyée.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Identifiant unique de la réservation
 *       - in: body
 *         name: body
 *         required: true
 *         description: Données à mettre à jour
 *         schema:
 *           type: object
 *           properties:
 *             logement_id:
 *               type: string
 *             client_id:
 *               type: string
 *             start:
 *               type: string
 *             end:
 *               type: string
 *     responses:
 *       200:
 *         description: Réservation mise à jour
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @swagger
 * /reservations/{id}:
 *   delete:
 *     tags:
 *       - Reservations
 *     summary: Supprimer une réservation
 *     description: |
 *       Cette route permet de supprimer définitivement une réservation à partir de son identifiant.
 *       - Vérifie d'abord si la réservation existe.
 *       - Si oui, elle est supprimée.
 *       - Si non, une erreur 404 est renvoyée.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Identifiant unique de la réservation
 *     responses:
 *       204:
 *         description: Réservation supprimée avec succès
 *       404:
 *         description: Réservation non trouvée
 *       500:
 *         description: Erreur interne du serveur
 */
