import mongoose from "mongoose";

const followSchema = new mongoose.Schema({
    followerType: {
        type: String,
        enum: ["User", 'Doctor', 'Pharmacist'],
        required: true
    },
    follower: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "followerType",
        required: true
    },
    followingType: {
        type: String,
        enum: ["User", 'Doctor', 'Pharmacist'],
        required: true
    },
    following: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "followingType",
        required: true
    },
}, { timestamps: true })

const Follow = mongoose.model('Follow', followSchema);
export default Follow