import express from 'express';
import apiRoutes from './routes/api.js';
import bodyParser from 'body-parser';
import cors from 'cors'
import {bcController} from "./controllers/bcController.mjs";

const app = express();
const port = 3001;

app.use(cors())
console.log("CORS abilitato");

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api', apiRoutes);
app.use(bodyParser.json());





app.listen(port, () => {
    console.log(`SERVER online: http://localhost:${port}`);
});

app.use("/addPatient", bcController.addPatient)


