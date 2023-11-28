const express = require('express')
const bcController = require('../controllers/bcController')

const router = express.Router();

router.post('/addPatient', bcController.addPatient);
router.get('/addPatient', bcController.getPatient);

router.post('/addDoctor', bcController.addDoctor);
router.get('/addDoctor', bcController.getDoctor);

// Aggiungere tutte le altre route per le operazioni su blockchain