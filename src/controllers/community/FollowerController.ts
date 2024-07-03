import { Request, Response } from "express"
import Follow from "../../models/Community/Follower"

export const addFollow = async (req: Request, res: Response) => {
    try {
        const { followerId, followerType } = req.body;
        if (!followerId) return res.status(400).json({ message: 'Not Allow!!' })
        if (!followerType) return res.status(400).json({ message: 'Not Allow!!' })
        const isFollow = await Follow.findOne({
            following: req.user._id,
            follower: followerId
        })
        let role = req.role;
        role = `${role.split('')[0].toUpperCase()}${role.slice(1)}`
        if (isFollow) {
            await Follow.findByIdAndDelete(isFollow._id);
            return res.status(200).json({ follow: false })
        } else {
            let followingRole = followerType;
            followingRole = `${followingRole.split('')[0].toUpperCase()}${followingRole.slice(1)}`
            await Follow.create({
                following: req.user._id,
                followingType: role,
                followerType: followingRole,
                follower: followerId
            });
            return res.status(200).json({ follow: true })
        }
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}
export const followNumber = async (req: Request, res: Response) => {
    try {
        const { userId } = req.query;
        const followNumber = await Follow.countDocuments({ follower: userId });
        return res.status(200).json({ followNumber })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}