const connectDB = require('../config/db');

const getLogements = async (req, res) => {
    const db = await connectDB();
    const collection = db.collection('logements');
        
    let results = await collection.find({}).toArray();
    
    if (req.query.station) {
        results = results.filter(logement => logement.station === req.query.station);
    }
    if (req.query.capacite) {
        results = results.filter(logement => logement.capacite >= parseInt(req.query.capacite));
    }
    if (req.query.prix_par_nuit) {
        results = results.filter(logement => logement.prix_par_nuit <= parseInt(req.query.prix_par_nuit));
    }
    if (req.query.date_debut && req.query.date_fin) {
        const start = new Date(req.query.date_debut);
        const end = new Date(req.query.date_fin);
        
        const reservations = await db.collection('reservations').find({}).toArray();

        results = results.filter(logement => {
            const conflit = reservations.find(r => r.logement_id === logement.id && start < new Date(r.end) && end > new Date(r.start));
            return !conflit;
        });
    }
    
    if (results.length != 0) {
        res.json(results);
    } else {
        res.status(404).json({ message: "Aucun logement !!" });
    }
};

const createLogement = async (req, res) => {
  const { nom, station, prix_par_nuit, capacite } = req.body;
  const db = await connectDB();
  const collection = db.collection('logements');

  const logementsExistants = await collection.find().sort({id: -1}).limit(1).toArray();
  let newId;
  
  if (logementsExistants.length > 0) {
      newId = logementsExistants[0].id + 1;
  } else {
      newId = 1;
  }

  const newLogement = {
    id: newId,
    nom,
    station,
    prix_par_nuit,
    capacite
  };

  await collection.insertOne(newLogement);
  res.status(201).json(newLogement);
};

const getLogementById = async (req, res) => {
  const Id = parseInt(req.params.id);
  const db = await connectDB();
  
  const logement = await db.collection('logements').findOne({ id: Id });

  if (logement) {
    res.json(logement);
  } else {
    res.status(404).json({ message: "Logement non trouvé !" });
  }
};

const updateLogement = async (req, res) => {
  const Id = parseInt(req.params.id);
  const db = await connectDB();
  const collection = db.collection('logements');

  const logement = await collection.findOne({ id: Id });

  if (!logement) {
    return res.status(404).json({ message: "Logement non trouvé !" });
  } else {
    const body = req.body || {};
    const logementModifie = {
      nom: body.nom || logement.nom,
      station: body.station || logement.station,
      prix_par_nuit: body.prix_par_nuit || logement.prix_par_nuit,
      capacite: body.capacite || logement.capacite
    };
    
    await collection.updateOne({ id: Id }, { $set: logementModifie });
    
    res.status(200).json({ id: Id, ...logementModifie });
  }
};

const deleteLogement = async (req, res) => {
  const Id = parseInt(req.params.id);
  const db = await connectDB();
  
  await db.collection('logements').deleteOne({ id: Id });
  
  res.status(204).send();
};

module.exports = {
  getLogements,
  createLogement,
  getLogementById,
  updateLogement,
  deleteLogement,
};