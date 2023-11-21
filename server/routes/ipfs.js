const express = require('express')
const router = express.Router()
const ipfsController = require('../controllers/ipfs')

const ipfsClient = require("ipfs-http-client");

const ipfs = ipfsClient({host: 'ipfs.infura.io', port: 5001, protocol: 'https'});

// Aggiungi un file a IPFS
router.post('/addFileToIPFS', ipfsController.addFileToIPFS)

// Recupera un file da IPFS
router.get('/getFileFromIPFS/:ipfsHash', ipfsController.getFileFromIPFS)