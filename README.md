# Ski Logements API

API REST pour une plateforme de location de logements au ski.

## Technologies

- Node.js
- Express
- Prisma
- MongoDB Atlas
- express-validator
- Swagger 

## Installation

### 1. Cloner le projet

```bash
git clone https://github.com/tarik-boutriq/Ski_logements.git
cd Ski_logements
```

### 2. Installer les dépendances

```bash
npm install
```

### 3. Configurer le fichier .env

Créer un fichier `.env` à la racine du projet :

```
DATABASE_URL="mongodb+srv://tarikboutriq7_db_user:xKWPQPn14aF1EnfY@cluster0.1yqkeax.mongodb.net/Ski_Logements?appName=Cluster0"
```
Le serveur tourne sur http://localhost:3001

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

## 7. Structure du projet

```bash
Ski_Logements/
├── controllers/          # Contrôleurs métier
├── middlewares/          # Middlewares
├── prisma/               # Schéma Prisma et configuration de la base de données
├── routes/               # Fichiers de routes annotés avec Swagger
├── node_modules/         # Dépendances npm
│
├── app.js                # Point d'entrée de l'application
├── package.json          # Fichier de configuration du projet npm
├── .env                  # Variables d'environnement
```

## Auteur

Boutriq Tarik
Aboud Mehdi
---
