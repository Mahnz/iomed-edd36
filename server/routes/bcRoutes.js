import express from 'express'
import {bcController} from '../controllers/bcController.mjs'

const router = express.Router();

router.post('/addPatient', bcController.addPatient);
router.get('/getPatient/:token', bcController.getPatient);
router.get("/getDoctor/:token", bcController.getDoctor);

router.get("/query", (req, res) => {
    console.log("Richiesta arrivata");
    bcController.getPatient();
    res.json("tutto ok");
});

router.post("/insertUser", bcController.addPatient);

router.post("/login", bcController.login);

router.post("/loginM", bcController.loginM);

router.post("/deleteRequest", bcController.deleteRequest);
router.post("/confirmRequest", bcController.confirmRequest);
router.get("/getDoctorsByCF/:token", bcController.getDoctors);
router.get("/getPatientsById/:token",bcController.getPatients);
router.get("/getRequest/:token", bcController.getRequests);
router.post("/deleteDoctor", bcController.deleteDoctor);
router.post("/addRequest", bcController.addRequest);
router.get("/getCF/:token",bcController.getCF);
router.post("/patientExist", bcController.patientExist);

router.get("/testpv", bcController.testpv);

router.get("/getData", (req, res) => {
    console.log("Richiesta arrivata");
    bcController.getAll();
    res.json("tutto ok")
})

export default router