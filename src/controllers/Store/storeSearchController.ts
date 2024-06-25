import StoreProduct from "../../models/Store/StoreProduct";
import FeatureApI from "../../utils/FeatureApI";
import { Request, Response } from "express";

export const storeSearch = async (req: Request, res: Response) => {
    try {
        const classModel = new FeatureApI(req, StoreProduct)
            .filter()
            .sort()
            .field()
            .limit()
            .searchProduct()

        const storeProduct = await classModel.model;
        return res.status(200).json({ products: storeProduct })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}