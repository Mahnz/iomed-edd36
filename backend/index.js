// Installa le librerie necessarie
// npm install express body-parser web3.storage
const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors")
const apiRouter = require('./routes/api')

const app = express();
const port = 3001;

app.use(bodyParser.json());


app.use(cors())
console.log("CORS abilitato su tutti i percorsi")
app.use('/api', apiRouter)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
