const express = require('express');
const ipfsController = require('../controllers/ipfsController');

const router = express.Router();

router.post('/addFileToIPFS', ipfsController.addFileToIPFS);
router.get('/getFileFromIPFS/:ipfsHash', ipfsController.getFileFromIPFS);

module.exports = router;