const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getLogements = async (req, res, next) => {
  try {
    const filters = {};
    
    if (req.query.station) filters.station = req.query.station;
    if (req.query.capacite) filters.capacite = { gte: parseInt(req.query.capacite) };
    if (req.query.prix_par_nuit) filters.prix_par_nuit = { lte: parseInt(req.query.prix_par_nuit) };
    if (req.query.type) filters.type = req.query.type;

    if (req.query.nom) {
        filters.nom = { contains: req.query.nom };
    }

    let tri = {};
    if (req.query.tri_prix) {
        tri.prix_par_nuit = req.query.tri_prix;
    }

    let results = await prisma.logement.findMany({
      where: filters,
      orderBy: Object.keys(tri).length > 0 ? tri : undefined
    });
    
    if (results.length != 0) {
        res.json(results);
    } else {
        const error = new Error("Aucun logement !!");
        error.status = 404;
        throw error;
    }
  } catch (err) {
    next(err);
  }
};

const createLogement = async (req, res, next) => {
  try {
    const { nom, station, prix_par_nuit, capacite, type, description } = req.body;

    const logementExistant = await prisma.logement.findFirst({
        where: {
            nom: nom,
            station: station
        }
    });

    if (logementExistant) {
        const error = new Error("Conflit : Un logement avec ce nom existe déjà dans cette station !");
        error.status = 409;
        throw error;
    }

    const newLogement = await prisma.logement.create({
      data: {
        nom,
        station,
        prix_par_nuit: parseInt(prix_par_nuit),
        capacite: parseInt(capacite),
        type,
        description
      }
    });

    res.status(201).json(newLogement);
  } catch (err) {
    next(err);
  }
};

const getLogementById = async (req, res, next) => {
  try {
    const logement = await prisma.logement.findUnique({
        where: { id: req.params.id }
    });

    if (logement) {
      res.json(logement);
    } else {
      const error = new Error("Logement non trouvé !");
      error.status = 404;
      throw error;
    }
  } catch (err) {
    next(err);
  }
};

const updateLogement = async (req, res, next) => {
  try {
    const logement = await prisma.logement.findUnique({
        where: { id: req.params.id }
    });

    if (!logement) {
      const error = new Error("Logement non trouvé !");
      error.status = 404;
      throw error;
    } else {
      const body = req.body || {};
      
      const logementModifie = await prisma.logement.update({
          where: { id: req.params.id },
          data: {
            nom: body.nom || logement.nom,
            station: body.station || logement.station,
            prix_par_nuit: body.prix_par_nuit ? parseInt(body.prix_par_nuit) : logement.prix_par_nuit,
            capacite: body.capacite ? parseInt(body.capacite) : logement.capacite,
            type: body.type || logement.type,
            description: body.description !== undefined ? body.description : logement.description
          }
      });
      
      res.status(200).json(logementModifie);
    }
  } catch (err) {
    next(err);
  }
};

const deleteLogement = async (req, res, next) => {
  try {
    const logement = await prisma.logement.findUnique({
        where: { id: req.params.id }
    });

    if (!logement) {
        const error = new Error("Logement non trouvé ! Impossible de le supprimer.");
        error.status = 404;
        throw error;
    }

    await prisma.logement.delete({
        where: { id: req.params.id }
    });
    
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getLogements,
  createLogement,
  getLogementById,
  updateLogement,
  deleteLogement,
};