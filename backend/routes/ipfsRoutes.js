import express from 'express';
import { ipfsController } from '../controllers/ipfsController.js';

const router = express.Router();

router.get('/test', ipfsController.connect);
router.post('/upload', ipfsController.saveToIpfs);
// router.get('/retrieve/:ipfsHash', ipfsController.retrieveFile);

export default router;