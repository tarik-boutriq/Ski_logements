const express = require('express');
const app = express();
const port = 3001;

const logementsRoutes = require('./routes/logements');
const clientsRoutes = require('./routes/clients');
const reservationsRoutes = require('./routes/reservations');

app.use(express.json());

app.use('/logements', logementsRoutes);
app.use('/clients', clientsRoutes);
app.use('/reservations', reservationsRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({
    error: err.message || "server error"
  });
});

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});