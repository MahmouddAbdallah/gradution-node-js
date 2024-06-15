import { Request, Response } from "express";
import { uploadImagesToCloudinary } from "../../middlewares/upload";
import BlogCategory from "../../models/Blog/Category";
import FeatureApI from "../../utils/FeatureApI";

export const createBlogCategory = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        if (!name) return res.status(400).json({ message: "Please Enter the name of category!" })
        const imgFiles = req.files as Express.Multer.File[];
        const imageUrls = await uploadImagesToCloudinary(imgFiles);
        const category = await BlogCategory.create({
            name,
            description,
            img: imageUrls[0]
        })
        return res.status(201).json({ message: "Create The category Successfully!", category })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}
export const fetchBlogCategory = async (req: Request, res: Response) => {
    try {
        const classModel = new FeatureApI(req, BlogCategory)
            .filter()
            .sort()
        const blogCategories = await classModel.model;
        return res.status(200).json({ message: 'fetch Successfully!', categories: blogCategories })

    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}