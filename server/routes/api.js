const express = require('express');
const ipfsClient = require('ipfs-http-client');
const app = express();
const port = 3000;
const ipfs = require('./ipfs')
const usersRouter = require('./users')

// Configura l'endpoint del tuo nodo IPFS


// Altre API per gestire login, signup, retrieve pazienti da Hyperledger Fabric...

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
