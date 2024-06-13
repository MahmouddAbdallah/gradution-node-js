import express, { Request, Response } from 'express';
import { protectionAuth } from '../middlewares/verifyAuth';

const router = express.Router();

router.get('/verify-me', protectionAuth, async (req: Request, res: Response) => {
    try {
        return res.status(200).json({ user: req.user })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
})

export default router