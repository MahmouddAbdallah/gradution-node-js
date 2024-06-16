import { Request, Response } from "express";
import { uploadImagesToCloudinary } from "../../middlewares/upload";
import BlogArticle from "../../models/Blog/Article";
import FeatureApI from "../../utils/FeatureApI";
import BlogSection from "../../models/Blog/Section";
import User from "../../models/User";
import Doctor from "../../models/Doctor";
import Pharmacist from "../../models/Pharmacist";

export const createBlogArticle = async (req: Request, res: Response) => {
    try {
        const { title, description, categoryId } = req.body;
        if (!title) return res.status(400).json({ message: "Please Enter the title of Article!" })
        const imgFiles = req.files as Express.Multer.File[];
        const imageUrls = await uploadImagesToCloudinary(imgFiles);
        const Article = await BlogArticle.create({
            title,
            description,
            img: imageUrls[0],
            user: {
                _id: req.user._id,
                role: req.role
            },
            category: categoryId
        })
        return res.status(201).json({ message: "Create The Article Successfully!", Article })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}

export const fetchBlogArticles = async (req: Request, res: Response) => {
    try {
        const classModel = new FeatureApI(req, BlogArticle)
            .filter()
            .sort()
            .field('-user -createdAt -updatedAt -__v')
            .limit()
            .populate('category', 'name')
        const articles = await classModel.model;
        return res.status(200).json({ message: 'fetch Successfully!', articles })

    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}

export const fetchBlogArticle = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const article = await BlogArticle.findById(id)
        let user: any = {};
        if (!article) return res.status(400).json({ message: 'This article not found!!' })
        if (article?.user?.role == 'user') {
            user = await User.findById(article.user._id).select("-password -__v -updatedAt -createdAt");
        }
        else if (article?.user?.role == 'doctor') {
            user = await Doctor.findById(article.user._id).select("-password -__v -updatedAt -createdAt")
        }
        else if (article?.user?.role == 'pharmacist') {
            user = await Pharmacist.findById(article.user._id).select("-password -__v -updatedAt -createdAt")
        }
        const sections = await BlogSection.find({ article: id }).select("-__v -updatedAt -createdAt")
        if (article)
            return res.status(200).json({
                article: {
                    _id: article._id,
                    title: article.title,
                    description: article.description,
                    img: article.img,
                    createdAt: article.createdAt,
                    user,
                    content: sections
                }
            })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}

