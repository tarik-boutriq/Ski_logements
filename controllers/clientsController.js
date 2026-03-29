const connectDB = require('../config/db');

const getclients = (req, res) => {
    res.json(clients); 
};

const createClients = (req, res) => {
  const { nom_de_client, prenom_de_client} = req.body;
  const newLogement = {
    id: clients.length + 1,
    nom_de_client,
    prenom_de_client
}};

module.exports = {
    getclients,
    createClients
};
