import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
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
    note: {
        type: String,
        required: true
    }
}, { timestamps: true })
const foodNote = mongoose.model('foodNote', foodSchema);
export default foodNote