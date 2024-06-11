import express from 'express';
import { doctorSignUp, pharmacistSignUp, signIn, signUp } from '../controllers/auth'
const router = express.Router();

router.post('/user/sign-up', signUp)
router.post('/doctor/sign-up', doctorSignUp)
router.post('/pharmacist/sign-up', pharmacistSignUp)
router.post('/sign-in', signIn)

export default router