const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const app = express();
const port = 3001;

const logementsRoutes = require('./routes/logements');
const clientsRoutes = require('./routes/clients');
const reservationsRoutes = require('./routes/reservations');

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.use('/logements', logementsRoutes);
app.use('/clients', clientsRoutes);
app.use('/reservations', reservationsRoutes);

app.use((req, res, next) => {
  const error = new Error("Cette route n'existe pas");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  console.error(err);
  
  const statusCode = err.status || 500;
  
  res.status(statusCode).json({
    error: {
      code: statusCode,
      message: err.message || "Erreur interne du serveur"
    }
  });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
  console.log(`Documentation Swagger disponible sur http://localhost:${port}/api-docs`);
});