const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const dbName = 'Ski_Logements';

async function connectDB() {
    await client.connect();
    console.log('Connecté avec succès à MongoDB');
    return client.db(dbName);
}

module.exports = connectDB;