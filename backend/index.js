const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes/api')
const cors = require("cors")

const app = express();
const port = 3001;

app.use(express.json())
app.use(cors())
console.log("CORS abilitato su tutti i percorsi")
app.use('/api', apiRouter)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
