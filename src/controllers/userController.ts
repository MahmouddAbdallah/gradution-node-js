import { Request, Response } from "express"
import Pharmacist from "../models/Pharmacist";
import Doctor from "../models/Doctor";
import User from "../models/User";
import deleteImagesToCloudinary, { uploadImagesToCloudinary } from "../middlewares/upload";
import FeatureApI from "../utils/FeatureApI";

export const updateUser = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const id = req.user._id;
        const imgFiles = req.files as Express.Multer.File[];
        let picture: string[] = [];
        if (imgFiles) {
            if (req.user.picture) {
                const data = await deleteImagesToCloudinary(req.user.picture)
                if (data)
                    picture = await uploadImagesToCloudinary(imgFiles);
                else res.status(400).json({ message: 'Try later', })
            }
            else
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
        const imgFiles = req.files as Express.Multer.File[];
        let picture: string[] = []
        if (imgFiles) {
            if (req.user.picture) {
                const data = await deleteImagesToCloudinary(req.user.picture)
                if (data)
                    picture = await uploadImagesToCloudinary(imgFiles);
                else res.status(400).json({ message: 'Try later', })
            }
            else
                picture = await uploadImagesToCloudinary(imgFiles);
        }
        const pharmacist = await Pharmacist.findByIdAndUpdate(id, {
            ...body,
            picture: picture[0]
        }, { new: true })
        if (!pharmacist) return res.status(400).json({ message: "There is no account like this" })
        else return res.status(200).json({ user: pharmacist, message: "Successfuly updated!!" })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}
export const updateDoctor = async (req: Request, res: Response) => {
    try {
        const body = req.body;
        const id = req.user._id;
        const imgFiles = req.files as Express.Multer.File[];
        let picture: string[] = []
        if (imgFiles) {
            if (req.user.picture) {
                const data = await deleteImagesToCloudinary(req.user.picture)
                if (data)
                    picture = await uploadImagesToCloudinary(imgFiles);
                else res.status(400).json({ message: 'Try later', })
            }
            else
                picture = await uploadImagesToCloudinary(imgFiles);
        }
        const doctor = await Doctor.findByIdAndUpdate(id, {
            ...body,
            picture: picture[0]
        }, { new: true })
        if (!doctor) return res.status(400).json({ message: "There is no account like this" })
        else return res.status(200).json({ user: doctor, message: "Successfuly updated!!" })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}

export const fetchUserOrDoctorOrPharmacist = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id).select('-password -__v')
        if (user) {
            return res.status(200).json({ user })
        } else {
            const doctor = await Doctor.findById(id).select('-password -__v')
            if (doctor) {
                return res.status(200).json({ user: doctor })
            } else {
                const pharmacist = await Pharmacist.findById(id).select('-password -__v')
                if (pharmacist) {
                    return res.status(200).json({ user: pharmacist })
                } else {
                    return res.status(400).json({ message: 'This account is not exist' })
                }
            }
        }
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}
export const fetchDoctor = async (req: Request, res: Response) => {
    try {
        const doctorApi = new FeatureApI(req, Doctor)
            .filter()
            .field()
            .field('-password -__v')
            .sort()
            .limit()
            .search()

        const doctor = await doctorApi.model

        return res.status(200).json({ doctor })

    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}