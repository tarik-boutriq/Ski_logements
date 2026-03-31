const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getclients = async (req, res) => {
    let results = await prisma.client.findMany();
    
    if (req.query.nom_de_client) {
        results = results.filter(client => client.nom_de_client === req.query.nom_de_client);
    }
    if (req.query.prenom_de_client) {
        results = results.filter(client => client.prenom_de_client >= parseInt(req.query.prenom_de_client));
    }
    if (results.length != 0) {
        res.json(results);
    } else {
        res.status(404).json({ message: "Aucun client !!" });
    }
};

const createClient = async (req, res) => {
  const { nom_de_client, prenom_de_client, age} = req.body;

  const clientsExistants = await prisma.client.findMany({
      orderBy: { custom_id: 'desc' },
      take: 1
  });
  
  let newId;
  
  if (clientsExistants.length > 0) {
      newId = clientsExistants[0].custom_id + 1;
  } else {
      newId = 1;
  }

  const newClient = {
    custom_id: newId,
    nom_de_client,
    prenom_de_client,
    age
  };

  await prisma.client.create({ data: newClient });
  res.status(201).json(newClient);
};

const getClientById = async (req, res) => {
  const Id = parseInt(req.params.id);
  
  const client = await prisma.client.findUnique({
      where: { custom_id: Id }
  });

  if (client) {
    res.json(client);
  } else {
    res.status(404).json({ message: "client non trouvé !" });
  }
};

const updateClient = async (req, res) => {
  const Id = parseInt(req.params.id);

  const client = await prisma.client.findUnique({
      where: { custom_id: Id }
  });

  if (!client) {
    return res.status(404).json({ message: "client non trouvé !" });
  } else {
    const body = req.body || {};
    const clientModifie = {
      nom_de_client: body.nom_de_client || client.nom_de_client,
      prenom_de_client: body.prenom_de_client || client.prenom_de_client,
      age: body.age || client.age
    };
    
    await prisma.client.update({
        where: { custom_id: Id },
        data: clientModifie
    });
    res.status(200).json({ custom_id: Id, ...clientModifie });
  }
};

const deleteClient = async (req, res) => {
  const Id = parseInt(req.params.id);
  
  await prisma.client.delete({
      where: { custom_id: Id }
  });
  
  res.status(204).send();
};

module.exports = {
    getclients,
    createClient,
    getClientById,
    updateClient,
    deleteClient
};