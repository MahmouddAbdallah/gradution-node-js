import { Request, Response } from "express"
import Pharmacist from "../models/Pharmacist";
import Doctor from "../models/Doctor";
import User from "../models/User";
import deleteImagesToCloudinary, { uploadImagesToCloudinary } from "../middlewares/upload";

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
        const user = await User.findById(id)
        if (user) {
            return res.status(200).json({ user })
        } else {
            const doctor = await Doctor.findById(id)
            if (doctor) {
                return res.status(200).json({ user: doctor })
            } else {
                const pharmacist = await Pharmacist.findById(id)
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