import { Request, Response } from "express"
import Notification from "../../models/Notification";
import Message from "../../models/Chat/Message";
import Chat from "../../models/Chat/Chat";
import FeatureApI from "../../utils/FeatureApI";
import User from "../../models/User";
import findByRole from "../../middlewares/findByRole";

export const createMessage = async (req: Request, res: Response) => {
    try {
        const { text } = req.body;
        const { receiverId, receiverRole } = req.params;

        if (!text)
            return res.status(400).json({
                message: 'Please, enter the message.'
            });
        const chat = await Chat.findOne({
            $or: [
                {
                    receiver: receiverId,
                    sender: req.user._id
                },
                {
                    sender: receiverId,
                    receiver: req.user._id
                }
            ]
        })
        let role = req.role;
        role = `${role.split('')[0].toUpperCase()}${role.slice(1)}`
        if (chat) {
            await Chat.findByIdAndUpdate(chat._id, {
                lastMessage: text
            }, { new: true });
            if (!chat) return res.status(400).json({ message: "This chatId is invaild!" })
            const message = await Message.create({
                text,
                userType: role,
                sender: req.user._id,
                chat: chat._id,
            })
            return res.status(201).json({ message })
        } else {
            const receiverType = `${receiverRole.split('')[0].toUpperCase()}${receiverRole.slice(1)}`
            const chat = await Chat.create({
                receiverType,
                receiver: receiverId,
                sender: req.user._id,
                senderType: role,
                lastMessage: text
            })
            const message = await Message.create({
                text,
                userType: role,
                sender: req.user._id,
                chat: chat._id
            })
            return res.status(201).json({ message, chat })
        }
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}

export const fetchMessages = async (req: Request, res: Response) => {
    try {
        const { chatId } = req.params;
        const classApi = new FeatureApI(req, Message)
            .filter()
            .find({ chat: chatId })
            .field("-__v -updatedAt")
            .sort()
            .limit()
        const messages = await classApi.model
        if (!messages) return res.status(400).json({ message: "this chat not found" })
        return res.status(200).json({ messages })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}

export const fetchChats = async (req: Request, res: Response) => {
    try {



        const user = req.user;
        const classApi = new FeatureApI(req, Chat)
            .filter()
            .find({
                $or: [
                    { receiver: user._id },
                    { sender: user._id }
                ]
            })
            .limit()
        const chats = await classApi.model
        if (!chats) return res.status(400).json({ message: "this chat not found" })

        const newChat = Promise.all(chats.map(
            async (item: any) => {
                const userId = JSON.stringify(user._id)
                const senderId = JSON.stringify(item.sender)
                if (userId == senderId) {
                    const user = await findByRole(item.receiver, item.receiverType)
                    console.log({ rec: item.receiver, role: item.receiverType });

                    return {
                        _id: item._id,
                        user,
                        lastMessage: item.lastMessage,
                    }
                } else {
                    const user = await findByRole(item.sender, item.senderType)

                    return {
                        _id: item._id,
                        user,
                        lastMessage: item.lastMessage,
                    }
                }
            }
        ))
        return res.status(200).json({ chats: await newChat })
    } catch (error: any) {
        return res.status(400).json({ message: 'There is Error', error: error.message })
    }
}

