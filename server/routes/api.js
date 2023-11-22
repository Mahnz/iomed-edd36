const express = require('express');
const ipfsController = require('../controllers/ipfsController');

const router = express.Router();

// IPFS routes
router.post('/addFileToIPFS', ipfsController.addFileToIPFS);
router.get('/getFileFromIPFS/:ipfsHash', ipfsController.getFileFromIPFS);

// Other routes
// ...

module.exports = router;