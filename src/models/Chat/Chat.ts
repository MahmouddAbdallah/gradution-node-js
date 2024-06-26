import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    // users: [
    //     {
    //         userType: {
    //             type: String,
    //             enum: ['User', 'Pharmacist', 'Doctor']
    //         },
    //         user: {
    //             type: mongoose.Schema.ObjectId,
    //             refPath: "userType"
    //         }
    //     }
    // ],
    receiverType: {
        type: String,
        enum: ['User', 'Pharmacist', 'Doctor'],
        required: true
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        refPath: "receiverType"
    },
    senderType: {
        type: String,
        enum: ['User', 'Pharmacist', 'Doctor'],
        required: true
    },
    sender: {
        type: mongoose.Schema.ObjectId,
        refPath: "senderType"
    },
    lastMessage: {
        type: String,
        default: ""
    }
}, { timestamps: true })

const Chat = mongoose.model('Chat', chatSchema);
export default Chat