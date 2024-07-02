import foodNote from "../models/FoodNote";
import { Request, Response } from "express"
import FeatureApI from "../utils/FeatureApI";


export const createFoodNote = async (req: Request, res: Response) => {
    try {
        const { note } = req.body;
        if (!note) return res.status(400).json({ message: 'Please Enter note' })
        let role = req.role;
        role = `${role.split('')[0].toUpperCase()}${role.slice(1)}`
        const noted = await foodNote.create({
            userType: role,
            user: req.user._id,
            note
        })
        return res.status(201).json({ message: 'Successfully!', note: noted })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}


export const fetchFoodNote = async (req: Request, res: Response) => {
    try {
        let FoodNote = new FeatureApI(req, foodNote)
            .filter()
            .find({ user: req.user._id })
            .field()

        FoodNote = await FoodNote.model

        return res.status(201).json({ note: FoodNote })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}