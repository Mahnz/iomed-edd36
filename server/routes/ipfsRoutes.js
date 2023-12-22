import express from 'express'
import {ipfsController} from '../controllers/ipfsController.js'
import multer from 'multer'

const router = express.Router()
const storage = multer.memoryStorage()
const upload = multer({storage: storage})

router.post('/addVisita', upload.array('allegati'), ipfsController.addVisita)
router.get('/getAllVisiteByCF/:codiceFiscale', ipfsController.getAllVisiteByCF)
router.get('/getSingleVisitaByCF/:codiceFiscale/:nomeVisita', ipfsController.getSingleVisitaByCF)

// ? TEST AGGIUNTA DELLA VISITA
router.post('/saveToIpfs', upload.array('file'), ipfsController.saveToIpfs)

export default router