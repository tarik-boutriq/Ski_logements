const express = require('express');
const app = express();
const port = 3001;

const logementsRoutes = require('./routes/logements');

app.use(express.json());

app.use('/logements', logementsRoutes);

app.listen(port, () => {
  console.log(`Serveur démarré sur http://localhost:${port}`);
});