import { Request, Response } from "express"
import Water from "../models/Water";
import FeatureApI from "../utils/FeatureApI";

export const createWater = async (req: Request, res: Response) => {
    try {
        const { amount } = req.body;
        if (!amount) return res.status(400).json({ message: 'Please Enter amount' })
        let role = req.role;
        role = `${role.split('')[0].toUpperCase()}${role.slice(1)}`
        const water = await Water.create({
            userType: role,
            user: req.user._id,
            amount,
        })
        return res.status(201).json({ message: 'Successfully!', water })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}

export const fetchWater = async (req: Request, res: Response) => {
    try {
        let water = new FeatureApI(req, Water)
            .filter()
            .find({ user: req.user._id })
            .field()

        water = await water.model

        return res.status(201).json({ message: 'Successfully!', water })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}