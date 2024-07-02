import mongoose from "mongoose";

const waterSchema = new mongoose.Schema({
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
    amount: {
        type: Number,
        required: true
    },
}, { timestamps: true })
const Water = mongoose.model('Water', waterSchema);
export default Water