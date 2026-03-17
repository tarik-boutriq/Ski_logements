const { log } = require('node:console');
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

const logmentsfilter = (req, res) => {
    let results = [...logements];
    // filtre des logements par la ville (station)
    if (req.query.station) {
        results = results.filter(logement => logement.station.toLowerCase() === req.query.station.toLowerCase());
    }
    // filtre les logments dapres la capacite
    if ( res.query.capacite) {
        results = results.filter(logement => logement.capacite >= parseInt(req.query.capacite))
    }
    res.json(results);
}
        
module.exports = {
  getLogements,
  createLogement,
  getLogementById,
  updateLogement,
  deleteLogement,
  logmentsfilter
};