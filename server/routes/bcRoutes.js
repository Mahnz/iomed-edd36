import express from 'express'
import {bcController} from '../controllers/bcController.mjs'

const router = express.Router();

router.post('/addPatient', bcController.addPatient);
router.get('/getPatient', bcController.getPatient);

router.get("/query", (req, res) => {
    console.log("Richiesta arrivata");
    bcController.query();
    res.json("tutto ok");
});

router.post("/insertUser", bcController.addPatient);

router.post("/login", bcController.login);

router.get("/getData", (req, res) => {
    console.log("Richiesta arrivata");
    bcController.getAll();
    res.json("tutto ok")
})

export default router