import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
    userType: {
        type: String,
        enum: ["User", 'Doctor', 'Pharmacist'],
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "userType",
        required: true
    },
    comment: {
        type: mongoose.Schema.ObjectId,
        ref: "Comment"
    },
    text: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Reply = mongoose.model('Reply', replySchema);
export default Reply