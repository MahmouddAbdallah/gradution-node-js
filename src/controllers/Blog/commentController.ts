import { Request, Response } from "express";
import BlogComment from "../../models/Blog/Comment";
import BlogArticle from "../../models/Blog/Article";
import User from "../../models/User";
import Doctor from "../../models/Doctor";
import Pharmacist from "../../models/Pharmacist";

export const createBlogComment = async (req: Request, res: Response) => {
    try {
        const { text } = req.body;
        const { articleId } = req.params
        const article = await BlogArticle.findById(articleId)
        if (!article) return res.status(404).json({ message: "Article Not Found!" })
        if (!text) return res.status(400).json({ message: "Please Enter the title of Article!" })
        const comment = await BlogComment.create({
            text,
            article: articleId,
            user: {
                _id: req.user._id,
                role: req.role
            },
        })
        return res.status(201).json({ message: "Create The Article Successfully!", comment })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}
export const fetchBlogComment = async (req: Request, res: Response) => {
    try {
        const { articleId } = req.params;
        const article = await BlogArticle.findById(articleId);
        if (!article) return res.status(404).json({ message: "Article Not Found!" });

        let comments = await BlogComment.find({ article: articleId });

        const newComments = await Promise.all(comments.map(
            async (comment) => {
                let user: any = {};

                if (!comment.user) return false;

                if (article?.user?.role == 'user') {
                    user = await User.findById(comment.user._id).select("-password -__v -updatedAt -createdAt");
                }
                else if (comment?.user?.role == 'doctor') {
                    user = await Doctor.findById(comment.user._id).select("-password -__v -updatedAt -createdAt");
                }
                else {
                    user = await Pharmacist.findById(comment.user._id).select("-password -__v -updatedAt -createdAt");
                }
                return {
                    text: comment.text,
                    user: {
                        ...user._doc,
                        role: comment.user.role
                    },
                    createdAt: comment.createdAt
                };
            }
        ));

        return res.status(200).json({ comments: newComments });
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message });
    }
}

