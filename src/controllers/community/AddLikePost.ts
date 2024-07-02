import { Request, Response } from "express"
import Like from "../../models/Community/Like"

export const addLike = async (req: Request, res: Response) => {
    try {
        const isLike = await Like.findOne({ user: req.user._id })
        if (isLike) {
            await Like.findByIdAndDelete(isLike._id)
            res.status(200).json("remove")
        } else {
            let role = req.role;
            role = `${role.split('')[0].toUpperCase()}${role.slice(1)}`
            await Like.create({
                user: req.user._id,
                userType: role,
                post: req.body.postId
            })
            res.status(201).json("create")
        }
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}