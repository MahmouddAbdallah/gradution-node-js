import { Request, Response } from "express"
import { uploadImagesToCloudinary } from "../../middlewares/upload";
import Post from "../../models/Community/Post";
import Follow from "../../models/Community/Follower";
import Like from "../../models/Community/Like";


export const createPost = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;
        const imgsFile = req.files as Express.Multer.File[]
        let imgs;
        if (imgsFile?.length) {
            imgs = await uploadImagesToCloudinary(imgsFile);
        }
        let role = req.role;
        role = `${role.split('')[0].toUpperCase()}${role.slice(1)}`
        const post = await Post.create(
            {
                title,
                description,
                imgs,
                userType: role,
                user: req.user._id,
            }
        )
        return res.status(201).json({ message: 'Successfully!', post })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}

export const fetchPosts = async (req: Request, res: Response) => {
    try {
        // const followingUsers = await Follow.find({ following: req.user._id })
        // const followerList = followingUsers.map(item => item._id)
        const posts = await Post.find({
            // user: {
            //     $eleMatch: followerList
            // }
        }).populate('user', 'name picture country role').sort('-createdAt')
        const likes = Promise.all(
            posts.map(async (post) => {
                const likes = await Like.countDocuments({ post: post._id })
                const isLike = await Like.findOne({ user: req.user._id, post: post._id })
                return {
                    post,
                    likes: likes,
                    isLike
                }
            })
        )
        return res.status(200).json({ message: 'Successfully!', posts: await likes })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}

