import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
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
    imgs: [
        String
    ],
    title: {
        type: String,
    },
    description: {
        type: String,
    },
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema);
export default Post