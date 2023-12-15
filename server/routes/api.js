import express from 'express';
import ipfsRoutes from './ipfsRoutes.js';
import bcRoutes from './bcRoutes.js';

const router = express.Router()

router.get('/', (req, res) => {
    res.send("<h1>Nulla da vedere qui. Ciao.</h1>")
})

router.use('/ipfs', ipfsRoutes)
router.use('/bc', bcRoutes)

export default router