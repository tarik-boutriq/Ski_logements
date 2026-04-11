# Ski Logements API

API REST pour une plateforme de location de logements au ski.

## Technologies

- Node.js
- Express
- Prisma
- MongoDB Atlas
- express-validator
- Swagger (Documentation)
- JSON Web Token (JWT) (Authentification)
- express-rate-limit (Sécurité anti-spam)
- Winston (Système de logs professionnels)
- Bruno (Collection de requêtes de test)

## Fonctionnalités

- CRUD complet pour les Logements, Clients et Réservations.
- Sécurité : Routes protégées par token JWT.
- Protection : Limitation des requêtes (Rate Limiting) pour éviter les attaques DDoS.
- Traçabilité : Historique et journalisation des erreurs dans des fichiers de logs.
- Documentation : Interface Swagger interactive.

## Installation

### 1. Cloner le projet

```bash
git clone [https://github.com/tarik-boutriq/Ski_logements.git](https://github.com/tarik-boutriq/Ski_logements.git)
cd Ski_logements
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer les variables d'environnement

Créer un fichier `.env` à la racine du projet en utilisant le modèle fourni :

```bash
cp .env.example .env
```

Le serveur tourne par défaut sur http://localhost:3001

### 4. Générer le client Prisma

```bash
npx prisma generate
```

### 5. Synchroniser la base de données

```bash
npx prisma db push
```

### 6. Lancer le serveur

```bash
node app.js
```

## Structure du projet

```bash
Ski_Logements/
├── bruno/                # Collection de tests API
├── controllers/          # Contrôleurs métier
├── middlewares/          # Middlewares (auth, validation, logger)
├── prisma/               # Schéma Prisma et configuration de la base de données
├── routes/               # Fichiers de routes annotés avec Swagger
├── node_modules/         # Dépendances npm
│
├── app.js                # Point d'entrée de l'application
├── package.json          # Fichier de configuration du projet npm
├── .env.example          # Modèle des variables d'environnement
├── .gitignore            # Fichiers ignorés par Git
```

## Documentation de l'API

Une fois le serveur lancé, la documentation interactive Swagger est disponible à l'adresse suivante :
👉 `http://localhost:3001/api-docs`

## Tests de l'API (Bruno)

Le dossier `bruno/` contient toutes les requêtes nécessaires pour tester l'API.
1. Ouvrez le logiciel [Bruno](https://www.usebruno.com/).
2. Cliquez sur "Open Collection" et sélectionnez le dossier `bruno/` du projet.
3. Commencez par la requête `1. Inscription` puis `2. Connexion` pour récupérer votre Token d'authentification.

## Auteurs

Boutriq Tarik
Aboud Mehdi
```

