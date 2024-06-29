import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    userType: {
        type: String,
        enum: ['User', 'Pharmacist', 'Doctor']
    },
    sender: {
        type: mongoose.Schema.ObjectId,
        refPath: "userType"
    },
    chat: {
        type: mongoose.Schema.ObjectId,
        ref: 'Chat'
    },
    text: {
        type: String,
        required: [true, "Please, Enter The message."]
    }
}, { timestamps: true })

const Message = mongoose.model('Message', messageSchema);
export default Message