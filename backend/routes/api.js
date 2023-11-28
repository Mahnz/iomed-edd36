const express = require('express')
const ipfsRouter = require('./ipfsRoutes')
const bcRouter = require('./bcRoutes')

const router = express.Router()

router.get('/', (req, res) => {
    res.send("<h1>Nulla da vedere qui. Ciao.</h1>")
})

router.use('/ipfs', ipfsRouter)

router.use('/bc', bcRouter)

// Altri router per login, signup...

module.exports = router;