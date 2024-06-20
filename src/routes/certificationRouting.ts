import express from 'express';
import { protectionAuth } from '../middlewares/verifyAuth';
import { upload } from '../middlewares/upload';
import { fetchCertification, updateCertification } from '../controllers/certificationController';

const router = express.Router();
router.put('/certification', protectionAuth, upload.array('imgs', 10), updateCertification)
router.get('/certification/:userId', fetchCertification)


export default router