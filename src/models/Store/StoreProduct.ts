import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imgs: {
        type: [String],
    },
    category: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0
    },
    pharmacist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "pharmacist"
    },
    quantity: {
        type: Number,
        default: 1
    },
    useTo: String,
    warning: [String],
    ingredient: [String]
}, { timestamps: true })
const StoreProduct = mongoose.model('StoreProduct', productSchema);
export default StoreProduct