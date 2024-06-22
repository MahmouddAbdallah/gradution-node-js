import express from 'express';
import { protectionAuth } from '../middlewares/verifyAuth';
import { fetchDoctors, fetchUserOrDoctorOrPharmacist, updateDoctor, updatePharmacist, updateUser } from '../controllers/userController';
import { upload } from '../middlewares/upload';

const router = express.Router();

router.put('/user', protectionAuth, upload.array('picture', 1), updateUser)
router.put('/pharmacist', protectionAuth, upload.array('picture', 1), updatePharmacist)
router.route('/doctor')
    .put(protectionAuth, upload.array('picture', 1), updateDoctor)
    .get(fetchDoctors)

router.get('/user/:id', fetchUserOrDoctorOrPharmacist)

export default router