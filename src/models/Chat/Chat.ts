import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    receiverType: {
        type: String,
        enum: ['User', 'Pharmacist', 'Doctor'],
        required: true
    },
    receiver: {
        type: mongoose.Schema.ObjectId,
        refPath: "receiverType",
        require: true
    },
    senderType: {
        type: String,
        enum: ['User', 'Pharmacist', 'Doctor'],
        required: true
    },
    sender: {
        type: mongoose.Schema.ObjectId,
        refPath: "senderType",
        require: true
    },
    lastMessage: {
        type: String,
        default: ""
    }
}, { timestamps: true })

const Chat = mongoose.model('Chat', chatSchema);
export default Chat