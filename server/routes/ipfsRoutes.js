import express from 'express';
import {ipfsController} from '../controllers/ipfsController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer()

router.get('/test', ipfsController.connect);
router.post('/upload', upload.array('file'), ipfsController.saveToIpfs);
router.get('/getFilesByUsername/:username', ipfsController.getFilesByUsername);

export default router;