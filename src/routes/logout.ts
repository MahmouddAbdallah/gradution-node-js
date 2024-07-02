import express from 'express';
import { Request, Response } from "express"

const router = express.Router();

router.get('/logout', async (req: Request, res: Response) => {
    try {
        res.clearCookie('auth_token');
        res.status(200).json({ message: "Logged out" });
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
})

export default router