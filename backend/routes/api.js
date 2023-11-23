const express = require('express')
const ipfsRouter = require('./ipfsRoutes.js')

const router = express.Router()

router.use('/ipfs', ipfsRouter)

// Altri router per login, signup...

module.exports = router