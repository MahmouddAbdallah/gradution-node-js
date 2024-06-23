import express from 'express';
import { protectionAuth } from '../middlewares/verifyAuth';
import { fetchNotifications } from '../controllers/notificationController';


const router = express.Router();

router.get('/notification', protectionAuth, fetchNotifications)


export default router