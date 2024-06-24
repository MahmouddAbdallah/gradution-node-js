import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    userType: {
        type: String,
        enum: ['User', 'Pharmacist', 'Doctor']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        refPath: "userType"
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    review: {
        type: String,
        required: true
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: 'StoreProduct'
    }
}, { timestamps: true })
const StoreReview = mongoose.model('StoreReview', reviewSchema);
export default StoreReview