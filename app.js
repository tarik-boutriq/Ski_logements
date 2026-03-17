const express = require('express');
const app = express();
const port = 3001;

app.use(express.json());

let logements = [
  {
    id: 1,
    nom: "Chalet des Neiges",
    station: "Chamonix",
    prix_par_nuit: 150,
    capacite: 4
  },
  {
    id: 2,
    nom: "Appartement du Lac",
    station: "Annecy",
    prix_par_nuit: 120,
    capacite: 6
  }
];


app.get('/logements', (req, res) => {
  res.json(logements);
});


app.post('/logements',(req, res) => {
 const { nom, station, prix_par_nuit ,capacite } = req.body;

  const newLogement = {
    id: logements.length + 1,
    nom,
    station,
    prix_par_nuit,
    capacite
  };

  logements.push(newLogement);
  res.status(201).json(newLogement);
});

app.get('/logements/:id', (req, res) => {
  const Id = parseInt(req.params.id);
  const logement = logements.find(l => l.id === Id);

  if (logement) {
    res.json(logement);
  } else {
    res.status(404).json({ message: "Logement non trouvé !" });
  }
});

app.put('/logements/:id', (req, res) => {
  
  const Id = parseInt(req.params.id);
  const logement = logements.find(l => l.id === Id);

  if(!logement){
    return res.status(404).json({ message: "Logement non trouvé !" });
  } else {
    const logementModifie = {
      id: Id,
      nom: req.body.nom || logement.nom,
      station: req.body.station || logement.station,
      prix_par_nuit: req.body.prix_par_nuit || logement.prix_par_nuit,
      capacite: req.body.capacite || logement.capacite
    };
    
  const index = logements.indexOf(logement);
  logements[index] = logementModifie;
  res.status(200).json(logementModifie);
  }

});

app.listen(port, () => {
  console.log(`http://localhost:${port}/logements`);
});
