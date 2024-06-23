import { Request, Response } from 'express';
import Notification from '../models/Notification';
import FeatureApI from '../utils/FeatureApI';

export const fetchNotifications = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        const notificationAPI = new FeatureApI(req, Notification)
            .filter()
            .find({ user: user._id })
            .limit()
            .field('-updatedAt -__v')
            .sort()
            .populate("schemaId", '-createdAt -updatedAt -__v')
            .search()
        const notification = await notificationAPI.model;
        return res.status(200).json({ notification })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}
export const updateNotifications = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        await Notification.updateMany({
            user: user._id
        }, {
            isRead: true
        })
        return res.status(200).json({ message: "updated !!" })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}
export const deleteAllNotifications = async (req: Request, res: Response) => {
    try {
        const user = req.user;
        await Notification.deleteMany({
            user: user._id
        },)
        return res.status(200).json({ message: "Deleted !!" })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}
export const deleteNotification = async (req: Request, res: Response) => {
    try {
        const { id } = req.params
        await Notification.findByIdAndDelete(id);
        return res.status(200).json({ message: "Deleted !!" })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}