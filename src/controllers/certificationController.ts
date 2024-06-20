import { Request, Response } from "express";
import Certification from "../models/Certification";
import { uploadImagesToCloudinary } from "../middlewares/upload";

export const updateCertification = async (req: Request, res: Response) => {
    try {
        if (req.user.role == "doctor" || 'Pharmacist') {
            const imgFiles = req.files as Express.Multer.File[];
            let imgs: string[] = []
            let role = req.role;
            role = `${role.split('')[0].toUpperCase()}${role.slice(1)}`
            console.log(role);
            if (imgFiles) {
                imgs = await uploadImagesToCloudinary(imgFiles)
            }
            const certification = await Certification.findOneAndUpdate({
                user: req.user._id,
            },
                {
                    userType: role,
                    user: req.user._id,
                    imgs
                }, { new: true, upsert: true }
            )
            return res.status(200).json({ message: "Upload successfully!!", certification })
        }
        else
            return res.status(400).json({ message: "In future, we will add users" })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}
export const fetchCertification = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const certification = await Certification.findOne({
            user: userId,
        })
        return res.status(200).json({ certification })

    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}