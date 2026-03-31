const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getReservation = async (req, res) => {
    try {
        let results = await prisma.reservation.findMany(); 
        
        if (results.length !== 0) {
            res.json(results);
        } else {
            res.status(404).json({ message: "Aucune réservation trouvée !!" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Erreur lors de la récupération des données" }); 
    }
};

module.exports = {
  getReservation
};