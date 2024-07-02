import express from 'express';
import { createFoodNote, fetchFoodNote } from '../controllers/foodNote';
import { protectionAuth } from '../middlewares/verifyAuth';

const router = express.Router();

router.post('/foodnote-add', protectionAuth, createFoodNote)
router.get('/foodnote', protectionAuth, fetchFoodNote)

export default router