import express from 'express';
import apiRoutes from './routes/api.js';
import cors from 'cors'

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use('/api', apiRoutes);

app.use(cors())
console.log("CORS abilitato")

app.listen(port, () => {
    console.log(`SERVER online: http://localhost:${port}`);
});