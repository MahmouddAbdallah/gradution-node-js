import { Request, Response } from "express"
import Pharmacist from "../models/Pharmacist";
import Doctor from "../models/Doctor";
import User from "../models/User";
import { uploadImagesToCloudinary } from "../middlewares/upload";

export const updateUser = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const id = req.user._id;
        const imgFiles = req.files as Express.Multer.File[];
        let picture: string[] = [];
        if (imgFiles) {
            picture = await uploadImagesToCloudinary(imgFiles);
        }
        const user = await User.findByIdAndUpdate(id, {
            ...body,
            picture: picture[0]
        }, { new: true })
        if (!user) return res.status(400).json({ message: "There is no account like this" })
        else return res.status(200).json({ user, message: "Successfuly updated!!" })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}

export const updatePharmacist = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const id = req.user._id;
        const pharmacist = await Pharmacist.findByIdAndUpdate(id, {
            ...body
        }, { new: true })
        if (!pharmacist) return res.status(400).json({ message: "There is no account like this" })
        else return res.status(200).json({ pharmacist, message: "Successfuly updated!!" })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}
export const updateDoctor = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const id = req.user._id;
        const doctor = await Doctor.findByIdAndUpdate(id, {
            ...body
        }, { new: true })
        if (!doctor) return res.status(400).json({ message: "There is no account like this" })
        else return res.status(200).json({ doctor, message: "Successfuly updated!!" })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}