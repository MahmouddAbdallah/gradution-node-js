import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
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
    post: {
        type: mongoose.Schema.ObjectId,
        ref: "Post"
    },
    text: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Comment = mongoose.model('Comment', commentSchema);
export default Comment