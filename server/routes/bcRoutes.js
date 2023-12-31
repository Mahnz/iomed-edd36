import express from 'express'
import {bcController} from '../controllers/bcController.mjs'

const router = express.Router();

router.get('/getPatient/:token', bcController.getPatient);
router.get("/getDoctor/:token", bcController.getDoctor);
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
router.post("/verifyCF",bcController.verify);
router.post("/changePass", bcController.changePass);
router.post("/deleteUser", bcController.deleteUser);

router.get("/getData", bcController.getAll);


export default router