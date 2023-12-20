import express from 'express';
import {ipfsController} from '../controllers/ipfsController.js';
import multer from 'multer';

const router = express.Router();
const storage = multer.memoryStorage()
const upload = multer({storage: storage})

// router.post('/addVisita', ipfsController.addVisita);
router.post('/addVisita', upload.array('allegati'), ipfsController.addVisita);
// router.post('/addVisita', ipfsController.addVisita);
router.get('/getVisiteByUsername/:username', ipfsController.getVisiteByUsername);

// ? TEST AGGIUNTA DELLA VISITA
// router.post('/saveToIpfs', ipfsController.saveToIpfs);
router.post('/saveToIpfs', upload.array('file'), ipfsController.saveToIpfs);

export default router;