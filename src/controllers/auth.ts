import { Request, Response } from 'express'
import User from '../models/User';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Doctor from '../models/Doctor';
import Pharmacist from '../models/Pharmacist';
import { doctorSpecialization } from '../utils/varibles';

export const signUp = async (req: Request, res: Response) => {
    try {
        const { name, password, email } = req.body;
        if (!name) return res.status(400).json({ message: "The name feild is required" });
        if (!email) return res.status(400).json({ message: "The email feild is required" });
        if (!password) return res.status(400).json({ message: 'The password feild is required' })
        const isUser = await User.findOne({ email })
        const isDoctor = await Doctor.findOne({ email })
        const isPharmacist = await Pharmacist.findOne({ email })
        if (isUser || isDoctor || isPharmacist)
            return res.status(400).json({ message: 'This account is aleardy exist' })

        const user = await User.create({
            name,
            email,
            password: await bcrypt.hash(password, 10)
        })
        const token = jwt.sign({ id: user._id, role: "user" }, process.env.JWT_SECRET as string);
        res.status(201)
            .cookie('token',
                token,
                {
                    httpOnly: true,
                    secure: process.env.NODE_ENV == 'production',
                    maxAge: 22089963090
                }).json({
                    message: "Successfuly create account.",
                })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}
export const doctorSignUp = async (req: Request, res: Response) => {
    try {
        const { name, password, email, country, phone, specialization } = req.body;
        if (!name) return res.status(400).json({ message: "The name feild is required" });
        if (!email) return res.status(400).json({ message: "The email feild is required" });
        if (!password) return res.status(400).json({ message: 'The password feild is required' })
        if (!country) return res.status(400).json({ message: 'The country feild is required' })
        if (!phone) return res.status(400).json({ message: 'The phone feild is required' })
        if (!doctorSpecialization?.some((item) => item == specialization))
            return res.status(400).json({ message: 'The specialization feild is required' })

        const isUser = await User.findOne({ email })
        const isDoctor = await Doctor.findOne({ email })
        const isPharmacist = await Pharmacist.findOne({ email })
        if (isUser || isDoctor || isPharmacist)
            return res.status(400).json({ message: 'This account is aleardy exist' })
        const doctor = await Doctor.create({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            phone,
            country,
            specialization
        })
        const token = jwt.sign({ id: doctor._id, role: 'doctor' }, process.env.JWT_SECRET as string);
        return res.status(201)
            .cookie('token',
                token,
                {
                    httpOnly: true,
                    secure: process.env.NODE_ENV == 'production',
                    maxAge: 22089963090
                }).json({
                    message: "Successfuly create account.",
                })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}
export const pharmacistSignUp = async (req: Request, res: Response) => {
    try {
        const { name, password, email, country, phone, } = req.body;
        if (!name) return res.status(400).json({ message: "The name feild is required" });
        if (!email) return res.status(400).json({ message: "The email feild is required" });
        if (!password) return res.status(400).json({ message: 'The password feild is required' })
        if (!country) return res.status(400).json({ message: 'The country feild is required' })
        if (!phone) return res.status(400).json({ message: 'The phone feild is required' })
        const isUser = await User.findOne({ email })
        const isDoctor = await Doctor.findOne({ email })
        const isPharmacist = await Pharmacist.findOne({ email })
        if (isUser || isDoctor || isPharmacist)
            return res.status(400).json({ message: 'This account is aleardy exist' })
        const pharmacist = await Pharmacist.create({
            name,
            email,
            password: await bcrypt.hash(password, 10),
            phone,
            country,
        })
        const token = jwt.sign({ id: pharmacist._id, role: 'pharmacist' }, process.env.JWT_SECRET as string);
        return res.status(201)
            .cookie('token',
                token,
                {
                    httpOnly: true,
                    secure: process.env.NODE_ENV == 'production',
                    maxAge: 22089963090
                }).json({
                    message: "Successfuly create account.",
                })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}
export const signIn = async (req: Request, res: Response) => {
    try {
        const { password, email, } = req.body;
        if (!email) return res.status(400).json({ message: "The email feild is required" });
        if (!password) return res.status(400).json({ message: 'The password feild is required' })
        let role = "";
        let user: any = {};
        const isUser = await User.findOne({ email })
        const isDoctor = await Doctor.findOne({ email })
        const isPharmacist = await Pharmacist.findOne({ email })

        if (!isUser && !isDoctor && !isPharmacist)
            return res.status(400).json({ message: 'This account not found, please sign up' })
        if (isUser) {
            user = isUser;
            role = 'user';
        }
        else if (isDoctor) {
            user = isDoctor;
            role = 'doctor';
        }
        else {
            user = isPharmacist;
            role = 'pharmacist';
        }


        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch)
            return res.status(400).json({ message: 'The password is not correct' })

        const token = jwt.sign({ id: user._id, role: role }, process.env.JWT_SECRET as string);
        return res.status(200)
            .cookie('token',
                token,
                {
                    httpOnly: true,
                    secure: process.env.NODE_ENV == 'production',
                    maxAge: 22089963090
                }).json({
                    message: "Successfuly sign in.",
                })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}

