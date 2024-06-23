import express from 'express';
import { protectionAuth } from '../middlewares/verifyAuth';
import { deleteAllNotifications, deleteNotification, fetchNotifications, updateNotifications } from '../controllers/notificationController';


const router = express.Router();

router.route('/notification')
    .get(protectionAuth, fetchNotifications)
    .put(protectionAuth, updateNotifications)
    .delete(protectionAuth, deleteAllNotifications)

router.route('/notification/:id')
    .delete(deleteNotification)


export default router