import { Request, Response } from "express";
import { uploadImagesToCloudinary } from "../../middlewares/upload";
import BlogArticle from "../../models/Blog/Article";
import FeatureApI from "../../utils/FeatureApI";
import BlogSection from "../../models/Blog/Section";
import { createSearchData } from "../../utils/SearchSplit";

export const createBlogArticle = async (req: Request, res: Response) => {
    try {
        const { title, description, categoryId } = req.body;
        if (!title) return res.status(400).json({ message: "Please Enter the title of Article!" })
        const imgFiles = req.files as Express.Multer.File[];
        const imageUrls = await uploadImagesToCloudinary(imgFiles);
        let role = req.role;
        role = `${role.split('')[0].toUpperCase()}${role.slice(1)}`
        const Article = await BlogArticle.create({
            title,
            description,
            img: imageUrls[0],
            userType: role,
            user: req.user._id,
            category: categoryId
        })
        await createSearchData(title, 'blog')

        return res.status(201).json({ message: "Create The Article Successfully!", Article })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}
export const updateBlogArticle = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { id } = req.params
        const Article = await BlogArticle.findByIdAndUpdate(id, {
            ...body
        })
        await createSearchData(body?.title, 'blog')
        return res.status(201).json({ message: "Update The Article Successfully!", Article })
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
        const article = await BlogArticle.findById(id).populate("user", "name picture")
        const sections = await BlogSection.find({ article: id }).select("-__v -updatedAt -createdAt")
        if (article)
            return res.status(200).json({
                article: {
                    _id: article._id,
                    title: article.title,
                    description: article.description,
                    img: article.img,
                    createdAt: article.createdAt,
                    user: article.user,
                    content: sections
                }
            })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}
export const fetchBlogArticleByUserId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const classModel = new FeatureApI(req, BlogArticle)
            .find({ user: userId })
            .filter()
            .sort()
            .field('-user -createdAt -updatedAt -__v')
            .limit()
        const articles = await classModel.model;
        return res.status(200).json({ message: 'fetch Successfully!', articles })

    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}

