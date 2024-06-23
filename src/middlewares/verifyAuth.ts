import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload, verify } from 'jsonwebtoken'
import User from "../models/User";
import Doctor from "../models/Doctor";
import Pharmacist from "../models/Pharmacist";

declare global {
    namespace Express {
        interface Request {
            user: {
                _id: any,
                email: string,
                name: string,
                role: string,
                picture: string
            };
            role: string
        }
    }
}
export const protectionAuth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies['token'];
        if (!token) return res.status(400).json({ message: 'Please sign in!!!' })
        const decode = jwt.verify(token as string, process.env.JWT_SECRET as string);
        if (!decode) return res.status(400).json({ message: "this invaild token" });
        const id = (decode as JwtPayload).id;
        const role = (decode as JwtPayload).role;

        let user: any = {};
        if (role == 'user') {
            user = await User.findById(id).select("-password -__v -updatedAt -createdAt");
        }
        else if (role == 'doctor') {
            user = await Doctor.findById(id).select("-password -__v -updatedAt -createdAt")
        }
        else if (role == 'pharmacist') {
            user = await Pharmacist.findById(id).select("-password -__v -updatedAt -createdAt")
        }
        if (!user) return res.status(400).json({ message: 'This account not found, please sign up' })
        else {
            req.user = user;
            req.role = role;
            next()
        }

    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}