import { Request, Response } from "express"
import Bio from "../models/BioUser";

export const creaeBio = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const user = req.user;
        console.log(user);

        let role = req.role;
        role = `${role.split('')[0].toUpperCase()}${role.slice(1)}`
        console.log(role);

        const bio = await Bio.create({
            userType: role,
            user: user._id,
            ...body
        })
        return res.status(201).json({ message: "create bio successfully!!", bio })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}

export const updateBio = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const user = req.user;
        let role = req.role;
        role = `${role.split('')[0].toUpperCase()}${role.slice(1)}`
        console.log(role);
        const bio = await Bio.findOneAndUpdate(
            {
                user: user._id
            },
            {
                userType: role,
                user: user._id,
                updatedAt: new Date(),
                ...body
            }, { upsert: true, new: true })
        return res.status(201).json({ message: "update bio successfully!!", bio })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}

export const fetchBio = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const bio = await Bio.find({
            user: userId
        }).select("-createdAt -updatedAt -userType -user -__v")
        return res.status(200).json({ bio: bio[0] })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}

