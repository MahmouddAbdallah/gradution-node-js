import { Request, Response } from "express"
import Comment from "../../models/Community/Comment";

export const addComment = async (req: Request, res: Response) => {
    try {
        const { text } = req.body;
        let role = req.role;
        role = `${role.split('')[0].toUpperCase()}${role.slice(1)}`
        const comment = await Comment.create({
            text,
            user: req.user._id,
            userType: role
        })
        return res.status(201).json({ message: 'Successfully!', comment })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}

export const removeComment = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await Comment.findByIdAndDelete(id)
        return res.status(200).json({ message: 'Successfully!' })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}