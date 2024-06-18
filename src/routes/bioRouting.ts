import express from 'express';
import { creaeBio, fetchBio, updateBio } from "../controllers/BioController";
import { protectionAuth } from '../middlewares/verifyAuth';

const router = express.Router();

router.route('/bio')
    .post(protectionAuth, creaeBio)
    .put(protectionAuth, updateBio);
router.get("/bio/:userId", fetchBio)

export default router;