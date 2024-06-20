import express from 'express';
import { protectionAuth } from '../middlewares/verifyAuth';
import { upload } from '../middlewares/upload';
import { updateCertification } from '../controllers/certificationController';

const router = express.Router();
router.put('/certification', protectionAuth, upload.array('imgs', 10), updateCertification)

export default router