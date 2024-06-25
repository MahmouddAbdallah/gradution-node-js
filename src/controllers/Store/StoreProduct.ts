import { Request, Response } from "express";
import { uploadImagesToCloudinary } from "../../middlewares/upload";
import FeatureApI from "../../utils/FeatureApI";
import StoreProduct from "../../models/Store/StoreProduct";

export const createStoreProduct = async (req: Request, res: Response) => {
    try {
        const {
            title,
            description,
            price,
            category,
            rating,
            quantity,
            useTo,
            warning,
            ingredient
        } = req.body;

        if (!title)
            return res.status(400).json({
                message: "Please Enter the title of Product!"
            })
        if (!description)
            return res.status(400).json({
                message: "Please Enter the description of Product!"
            })
        if (!price)
            return res.status(400).json({
                message: "Please Enter the price of Product!"
            })
        if (req.user.role != "pharmacist")
            return res.status(400).json({
                message: "You don't have authorize"
            })

        const imgFiles = req.files as Express.Multer.File[];
        const imageUrls = await uploadImagesToCloudinary(imgFiles);
        const product = await StoreProduct.create({
            title,
            price,
            description,
            imgs: imageUrls,
            category,
            rating,
            pharmacist: req.user._id,
            quantity,
            useTo,
            warning,
            ingredient
        })

        return res.status(201).json({
            product,
            message: "Create The Product Successfully!",
        })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}

export const updateStoreProduct = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const { id } = req.params;
        const product = await StoreProduct
            .findByIdAndUpdate(id,
                { ...body },
                {
                    new: true
                });
        if (!product) return res.status(404).json({
            message: "Product Not Found!"
        })
        return res.status(200).json({ product, message: 'Successfully updated to the prodcut' })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}
export const deleteStoreProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await StoreProduct
            .findByIdAndDelete(id)

        return res.status(200).json({ message: 'Successfully delete The Product' })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}
export const fetchStoreProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const product = await StoreProduct
            .findById(id)
            .populate("pharmacist", 'name picture')
        if (!product) return res.status(404).json({
            message: "Product Not Found!"
        })
        return res.status(200).json({ product })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}
export const fetchStoreProducts = async (req: Request, res: Response) => {
    try {
        const classModel = new FeatureApI(req, StoreProduct)
            .filter()
            .sort()
            .field()
            .limit()
            .search()
            .populate("pharmacist", 'picture name')
        const storeProduct = await classModel.model;
        return res.status(200).json({ products: storeProduct })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}

export const fetchProductByCategoryId = async (req: Request, res: Response) => {
    try {
        const { categorId } = req.params;
        const classModel = new FeatureApI(req, StoreProduct)
            .filter()
            .filter()
            .sort()
            .field()
            .limit()
            .search()
            .find({ category: categorId })
        const products = await classModel.model
        return res.status(200).json({ products })

    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}