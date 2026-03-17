let logements = require('../data/logements.json');

const getLogements = (req, res) => {
  res.json(logements);
};

const createLogement = (req, res) => {
  const { nom, station, prix_par_nuit, capacite } = req.body;
  
  const maxId = logements.length > 0 ? Math.max(...logements.map(l => l.id)) : 0;

  const newLogement = {
    id: maxId + 1,
    nom,
    station,
    prix_par_nuit,
    capacite
  };

  logements.push(newLogement);
  res.status(201).json(newLogement);
};

const getLogementById = (req, res) => {
  const Id = parseInt(req.params.id);
  const logement = logements.find(l => l.id === Id);

  if (logement) {
    res.json(logement);
  } else {
    res.status(404).json({ message: "Logement non trouvé !" });
  }
};

const updateLogement = (req, res) => {
  const Id = parseInt(req.params.id);
  const logement = logements.find(l => l.id === Id);

  if (!logement) {
    return res.status(404).json({ message: "Logement non trouvé !" });
  } else {
    const body = req.body || {};
    const logementModifie = {
      id: Id,
      nom: body.nom || logement.nom,
      station: body.station || logement.station,
      prix_par_nuit: body.prix_par_nuit || logement.prix_par_nuit,
      capacite: body.capacite || logement.capacite
    };
    
    const index = logements.indexOf(logement);
    logements[index] = logementModifie;
    res.status(200).json(logementModifie);
  }
};

const deleteLogement = (req, res) => {
  const Id = parseInt(req.params.id);
  logements = logements.filter(l => l.id !== Id);
  res.status(204).send();
};

module.exports = {
  getLogements,
  createLogement,
  getLogementById,
  updateLogement,
  deleteLogement
};