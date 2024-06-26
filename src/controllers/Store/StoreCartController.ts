import { Request, Response } from "express";
import StoreCart from "../../models/Store/StoreCart";
import FeatureApI from "../../utils/FeatureApI";

export const createStoreCart = async (req: Request, res: Response) => {
    try {
        const { product, quantity, price } = req.body;
        const user = req.user;

        let role = req.role;
        role = `${role.split('')[0].toUpperCase()}${role.slice(1)}`

        const cart = await StoreCart.create({
            user: user._id,
            userType: role,
            product,
            quantity,
            price
        })
        return res.status(201).json({ message: "create cart successfully!!", cart })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}
export const deleteStoreCart = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const cart = await StoreCart.findByIdAndDelete(id)
        return res.status(200).json({ cart })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}
export const fetchStoreCarts = async (req: Request, res: Response) => {
    try {
        const cartApi = new FeatureApI(req, StoreCart)
            .filter()
            .find({ user: req.user._id })
            .sort()
            .skip()
            .limit()
            .search()

        const carts = await cartApi.model;
        return res.status(200).json({ carts })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}