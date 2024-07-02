import { Request, Response } from "express";
import SearchModel from "../models/SearchModel";
import FeatureApI from "../utils/FeatureApI";
import StoreCategory from "../models/Store/StoreCategory";
import StoreProduct from "../models/Store/StoreProduct";
import BlogArticle from "../models/Blog/Article";
import BlogCategory from "../models/Blog/Category";
import User from "../models/User";
import Pharmacist from "../models/Pharmacist";
import Doctor from "../models/Doctor";
import Bio from "../models/BioUser";

export const searchKeywordController = async (req: Request, res: Response) => {
    try {
        const classApi = new FeatureApI(req, SearchModel)
            .filter()
            .searchKeyword()
            .limit()
            .field()
        const search = await classApi.model
        return res.status(200).json({ search })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}


export const searchData = async (req: Request, res: Response) => {
    try {
        const { type, keyword } = req.query;
        let product, storeCategory, article, blogCategory, user, doctor, pharmacist: any = {}
        if (!keyword) {
            return res.status(400).json({ message: 'Please enter keyword' })
        }
        if (type == 'store') {
            storeCategory = await StoreCategory.find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } }
                ]
            }).select('-createdAt -updatedAt -__v')
            product = await StoreProduct.find({
                $or: [
                    { title: { $regex: keyword, $options: 'i' } },
                ]
            }).select('-createdAt -updatedAt -__v')
            return res.status(200).json({ product, storeCategory })
        }
        else if (type == 'blog') {
            blogCategory = await BlogCategory.find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                ]
            }).select('-createdAt -updatedAt -__v')
            article = await BlogArticle.find({
                $or: [
                    { title: { $regex: keyword, $options: 'i' } },
                ]
            }).select('-createdAt -updatedAt -__v -category')
                .populate('user', 'name -_id')
            return res.status(200).json({ article, blogCategory })
        }
        else if (type == 'user' || type == 'doctor' || type == 'pharmacist') {
            user = await User.find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } }
                ]
            }).select('-createdAt -updatedAt -__v -password -email')
            pharmacist = await Pharmacist.find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } }
                ]
            }).select('-createdAt -updatedAt -__v -password -email')
            doctor = await Doctor.find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } }
                ]
            }).select('-createdAt -updatedAt -__v -password -email')
            return res.status(200).json({ user, pharmacist, doctor })
        } else {
            storeCategory = await StoreCategory.find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } }
                ]
            }).select('-createdAt -updatedAt -__v')
            product = await StoreProduct.find({
                $or: [
                    { title: { $regex: keyword, $options: 'i' } },
                ]
            }).select('-createdAt -updatedAt -__v')
            blogCategory = await BlogCategory.find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } },
                ]
            }).select('-createdAt -updatedAt -__v')
            article = await BlogArticle.find({
                $or: [
                    { title: { $regex: keyword, $options: 'i' } },
                ]
            }).select('-createdAt -updatedAt -__v -category')
                .populate('user', 'name -_id')
            user = await User.find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } }
                ]
            }).select('-createdAt -updatedAt -__v -password -email')
            pharmacist = await Pharmacist.find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } }
                ]
            }).select('-createdAt -updatedAt -__v -password -email')
            doctor = await Doctor.find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } }
                ]
            })
                .select('-createdAt -updatedAt -__v -password -email')

            return res.status(200).json({ product, storeCategory, article, blogCategory, user, doctor, pharmacist })
        }
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}