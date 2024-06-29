import express from 'express';
import { upload } from '../middlewares/upload';
import { createMessage, fetchChats, fetchMessages } from '../controllers/Chat/ChatController';
import { protectionAuth } from '../middlewares/verifyAuth'

const router = express.Router();
router.post('/message/:receiverId/:receiverRole', protectionAuth, createMessage)
router.get('/message/:chatId', fetchMessages)
router.get('/chat', protectionAuth, fetchChats)
export default router