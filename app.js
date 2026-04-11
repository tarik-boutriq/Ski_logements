require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const rateLimit = require('express-rate-limit');

const logger = require('./middlewares/logger');

const app = express();
const port = 3001;

const logementsRoutes = require('./routes/logements');
const clientsRoutes = require('./routes/clients');
const reservationsRoutes = require('./routes/reservations');
const authRoutes = require('./routes/auth');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: {
      code: 429,
      message: "Trop de requêtes effectuées depuis cette IP, veuillez réessayer dans 15 minutes."
    }
  },
  standardHeaders: true, 
  legacyHeaders: false, 
});

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Ski Logements',
      version: '1.0.0',
      description: 'Documentation de mon API de réservation de logements de ski',
    },
    servers: [
      {
        url: `http://localhost:${port}`,
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);

app.use(express.json());

app.use(limiter);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/logements', logementsRoutes);
app.use('/clients', clientsRoutes);
app.use('/reservations', reservationsRoutes);
app.use('/auth', authRoutes);

app.use((req, res, next) => {
  const error = new Error("Cette route n'existe pas");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  
  logger.error(`Erreur ${statusCode} : ${err.message}`);
  
  res.status(statusCode).json({
    error: {
      code: statusCode,
      message: err.message || "Erreur interne du serveur"
    }
  });
});

app.listen(port, () => {
  logger.info(`Serveur démarré sur http://localhost:${port}`);
  logger.info(`Documentation Swagger disponible sur http://localhost:${port}/api-docs`);
});