import StoreCategory from "../../models/Store/StoreCategory";
import { Request, Response } from "express";
import { uploadImagesToCloudinary } from "../../middlewares/upload";
import FeatureApI from "../../utils/FeatureApI";
import { createSearchData } from "../../utils/SearchSplit";

export const createStoreCategory = async (req: Request, res: Response) => {
    try {
        const { name, description } = req.body;
        if (!name) return res.status(400).json({ message: "Please Enter the name of category!" })
        const imgFiles = req.files as Express.Multer.File[];
        const imageUrls = await uploadImagesToCloudinary(imgFiles);
        const category = await StoreCategory.create({
            name,
            description,
            img: imageUrls[0]
        })
        await createSearchData(name, 'store')
        return res.status(201).json({ message: "Create The category Successfully!", category })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}

export const fetchStoreCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await StoreCategory.findById(id);
        if (!category) return res.status(404).json({
            message: "Category Not Found!"
        })
        return res.status(200).json({ category })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}
export const updateStoreCategory = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { id } = req.params;
        const category = await StoreCategory.findByIdAndUpdate(id, { body }, { new: true });
        if (!category) return res.status(404).json({
            message: "Category Not Found!"
        })
        return res.status(200).json({ category, message: 'Successfully update the category' })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}
export const deleteStoreCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const category = await StoreCategory.findByIdAndDelete(id,);
        if (!category) return res.status(404).json({
            message: "Category Not Found!"
        })
        return res.status(200).json({ message: 'Successfully deleted the category' })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}

export const fetchStoreCategorys = async (req: Request, res: Response) => {
    try {
        const classModel = new FeatureApI(req, StoreCategory)
            .filter()
            .sort()
            .field()
            .limit()
            .search()
        const storeCategories = await classModel.model;
        return res.status(200).json({ categories: storeCategories })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}