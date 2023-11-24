const express = require('express')
const ipfsRouter = require('./ipfsRoutes.js')

const router = express.Router()

router.get('/', (req, res) => {
    res.send("<h1>Nulla da vedere qui. Ciao.</h1>")
})

router.use('/ipfs', ipfsRouter)

// Altri router per login, signup...

module.exports = router