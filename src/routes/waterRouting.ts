import express from 'express';
import { createWater, fetchWater } from '../controllers/waterController';
import { protectionAuth } from '../middlewares/verifyAuth';

const router = express.Router();

router.post('/water-add', protectionAuth, createWater)
router.get('/water', protectionAuth, fetchWater)

export default router