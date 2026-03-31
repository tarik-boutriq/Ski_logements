const express = require('express');
const router = express.Router();
const { check, param } = require('express-validator');
const validate = require('../middlewares/validator');

const clientsController = require('../controllers/clientsController');

const clientValidationRules = [
    check('nom_de_client').notEmpty().withMessage('Le nom du client est obligatoire'),
    check('prenom_de_client').notEmpty().withMessage('Le prénom du client est obligatoire'),
    check('age').notEmpty().withMessage('L\'âge est obligatoire')
];

const idValidationRule = [
    param('id').isMongoId().withMessage('L\'identifiant du client est invalide')
];

router.get('/', clientsController.getclients);
router.get('/:id', validate(idValidationRule), clientsController.getClientById);
router.post('/', validate(clientValidationRules), clientsController.createClient);
router.put('/:id', validate([idValidationRule, clientValidationRules]), clientsController.updateClient);
router.delete('/:id', validate(idValidationRule), clientsController.deleteClient);

module.exports = router;



/**
 * @swagger
 * /clients:
 *   get:
 *     tags:
 *       - Clients
 *     summary: Récupérer tous les clients
 *     parameters:
 *       - in: query
 *         name: nom_de_client
 *         type: string
 *         description: Filtrer par nom
 *       - in: query
 *         name: prenom_de_client
 *         type: string
 *         description: Filtrer par prénom
 *       - in: query
 *         name: email
 *         type: string
 *         description: Filtrer par email exact
 *       - in: query
 *         name: tri_nom
 *         type: string
 *         enum: [asc, desc]
 *         description: Trier par nom
 *     responses:
 *       200:
 *         description: Liste des clients récupérée avec succès
 *       404:
 *         description: Aucun client trouvé
 */

/**
 * @swagger
 * /clients/{id}:
 *   get:
 *     tags:
 *       - Clients
 *     summary: Récupérer un client par son identifiant
 *     description: |
 *       Cette route permet de récupérer un client à partir de son identifiant.
 *       - Vérifie si le client existe.
 *       - Si oui, il est retourné.
 *       - Si non, une erreur 404 est renvoyée.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Identifiant unique du client
 *     responses:
 *       200:
 *         description: Client trouvé
 *       404:
 *         description: Client non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */
/**
 * @swagger
 * /clients:
 *   post:
 *     tags:
 *       - Clients
 *     summary: Créer un nouveau client
 *     description: |
 *       Cette route permet de créer un nouveau client.
 *       - Vérifie si l'email existe déjà.
 *       - Si oui, une erreur 409 est renvoyée.
 *       - Si non, le client est créé.
 *     parameters:
 *       - in: body
 *         name: body
 *         required: true
 *         description: Données du client à créer
 *         schema:
 *           type: object
 *           properties:
 *             nom_de_client:
 *               type: string
 *             prenom_de_client:
 *               type: string
 *             email:
 *               type: string
 *             numero:
 *               type: integer
 *             age:
 *               type: integer
 *     responses:
 *       201:
 *         description: Client créé avec succès
 *       409:
 *         description: Un client avec cet email existe déjà
 *       500:
 *         description: Erreur interne du serveur
 */
/**
 * @swagger
 * /clients/{id}:
 *   put:
 *     tags:
 *       - Clients
 *     summary: Mettre à jour un client
 *     description: |
 *       Cette route permet de modifier les informations d'un client existant.
 *       - Vérifie si le client existe.
 *       - Si oui, il est mis à jour.
 *       - Si non, une erreur 404 est renvoyée.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Identifiant unique du client
 *       - in: body
 *         name: body
 *         required: true
 *         description: Données à mettre à jour
 *         schema:
 *           type: object
 *           properties:
 *             nom_de_client:
 *               type: string
 *             prenom_de_client:
 *               type: string
 *             email:
 *               type: string
 *             numero:
 *               type: integer
 *             age:
 *               type: integer
 *     responses:
 *       200:
 *         description: Client mis à jour
 *       404:
 *         description: Client non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */

/**
 * @swagger
 * /clients/{id}:
 *   delete:
 *     tags:
 *       - Clients
 *     summary: Supprimer un client
 *     description: |
 *       Cette route permet de supprimer définitivement un client à partir de son identifiant.
 *       - Vérifie d'abord si le client existe.
 *       - Si oui, il est supprimé.
 *       - Si non, une erreur 404 est renvoyée.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         type: string
 *         description: Identifiant unique du client
 *     responses:
 *       204:
 *         description: Client supprimé avec succès
 *       404:
 *         description: Client non trouvé
 *       500:
 *         description: Erreur interne du serveur
 */

