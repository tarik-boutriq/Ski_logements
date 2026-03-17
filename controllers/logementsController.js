const { log } = require('node:console');
let logements = require('../data/logements.json');
let reservations = require('../data/reservations.json');
let clients = resuire('../data/client.json');

const getLogements = (req, res) => {
    let results = [...logements];
    if (req.query.station) {
        results = results.filter(logement => logement.station === req.query.station
        );
    }
    if (req.query.capacite) {
        results = results.filter(logement => logement.capacite >= parseInt(req.query.capacite)
        );
    }
    if (req.query.prix_par_nuit) {
        results = results.filter(logement => logement.prix_par_nuit <= parseInt(req.query.prix_par_nuit)
        );
    }
    if (results.length != 0) {
        res.json(results);
    } else {
        res.status(404).json({ 
            message: "Aucun logement !!" 
        });
    }
};

const createLogement = (req, res) => {
  const { nom, station, prix_par_nuit, capacite } = req.body;
  const newLogement = {
    id: logements.length + 1,
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
  deleteLogement,
};