const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getclients = async (req, res, next) => {
  try {
    const filters = {};
    
    if (req.query.nom_de_client) {
        filters.nom_de_client = { contains: req.query.nom_de_client };
    }
    if (req.query.prenom_de_client) {
        filters.prenom_de_client = { contains: req.query.prenom_de_client };
    }
    if (req.query.email) {
        filters.email = req.query.email;
    }

    let tri = {};
    if (req.query.tri_nom) {
        tri.nom_de_client = req.query.tri_nom;
    }

    let results = await prisma.client.findMany({
      where: filters,
      orderBy: Object.keys(tri).length > 0 ? tri : undefined
    });
    
    if (results.length != 0) {
        res.json(results);
    } else {
        const error = new Error("Aucun client !!");
        error.status = 404;
        throw error;
    }
  } catch (err) {
    next(err);
  }
};

const createClient = async (req, res, next) => {
  try {
    const { nom_de_client, prenom_de_client, email, numero, age } = req.body;

    const clientExistant = await prisma.client.findFirst({
        where: { email: email }
    });

    if (clientExistant) {
        const error = new Error("Conflit : Un client avec cet email existe déjà !");
        error.status = 409;
        throw error;
    }

    const newClient = await prisma.client.create({
      data: {
        nom_de_client,
        prenom_de_client,
        email,
        numero: parseInt(numero),
        age
      }
    });

    res.status(201).json(newClient);
  } catch (err) {
    next(err);
  }
};

const getClientById = async (req, res, next) => {
  try {
    const client = await prisma.client.findUnique({
        where: { id: req.params.id }
    });

    if (client) {
      res.json(client);
    } else {
        const error = new Error("Client non trouvé !");
        error.status = 404;
        throw error;
    }
  } catch (err) {
    next(err);
  }
};

const updateClient = async (req, res, next) => {
  try {
    const client = await prisma.client.findUnique({
        where: { id: req.params.id }
    });

    if (!client) {
        const error = new Error("Client non trouvé !");
        error.status = 404;
        throw error;
    } else {
      const body = req.body || {};
      
      const clientModifie = await prisma.client.update({
          where: { id: req.params.id },
          data: {
            nom_de_client: body.nom_de_client || client.nom_de_client,
            prenom_de_client: body.prenom_de_client || client.prenom_de_client,
            email: body.email || client.email,
            numero: body.numero ? parseInt(body.numero) : client.numero,
            age: body.age || client.age
          }
      });

      res.status(200).json(clientModifie);
    }
  } catch (err) {
    next(err);
  }
};

const deleteClient = async (req, res, next) => {
  try {
    const client = await prisma.client.findUnique({
        where: { id: req.params.id }
    });

    if (!client) {
        const error = new Error("Client non trouvé !");
        error.status = 404;
        throw error;
    }

    await prisma.client.delete({
        where: { id: req.params.id }
    });
    
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
    getclients,
    createClient,
    getClientById,
    updateClient,
    deleteClient
};