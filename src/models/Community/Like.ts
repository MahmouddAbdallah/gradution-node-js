import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
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
    }
}, { timestamps: true })

const Like = mongoose.model('Like', likeSchema);
export default Like