import express from 'express';
import {ipfsController} from '../controllers/ipfsController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer()

router.get('/test', ipfsController.connect);
router.post('/addVisita', upload.array('file'), ipfsController.addVisita);
router.get('/getFilesByUsername/:username', ipfsController.getFilesByUsername);

export default router;