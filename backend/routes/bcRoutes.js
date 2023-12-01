import express from 'express'
import {bcController} from '../controllers/bcController.js'

const router = express.Router();

router.post('/addPatient', bcController.addPatient);
router.get('/getPatient', bcController.getPatient);

// router.post('/addDoctor', bcController.addDoctor);
// router.get('/getDoctor', bcController.getDoctor);

// Aggiungere tutte le altre route per le operazioni su blockchain
export default router