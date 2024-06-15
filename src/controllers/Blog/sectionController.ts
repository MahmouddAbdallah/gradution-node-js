import { Request, Response } from "express";
import { uploadImagesToCloudinary } from "../../middlewares/upload";
import BlogSection from "../../models/Blog/Section";

export const createBlogSection = async (req: Request, res: Response) => {
    try {
        const { title, content, articleId, tags, video } = req.body;
        if (!title) return res.status(400).json({ message: "Please Enter the title of Section!" })
        if (!content) return res.status(400).json({ message: "Please Enter the content of Section!" })
        const imgFiles = req.files as Express.Multer.File[];
        const imageUrls = await uploadImagesToCloudinary(imgFiles);
        const Section = await BlogSection.create({
            title,
            content,
            img: imageUrls[0],
            video,
            tags,
            article: articleId
        })
        return res.status(201).json({ message: "Create The Section Successfully!", Section })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}
