const express = require('express');
const app = express();
const port = 3001;

const logementsRoutes = require('./routes/logements');
//const clientsRoutes = require('./routes/clients');

app.use(express.json());

app.use('/logements', logementsRoutes);
//app.use('/clients', clientsRoutes);

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});