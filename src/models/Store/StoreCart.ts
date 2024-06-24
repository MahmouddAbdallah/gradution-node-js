import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userType: {
        type: String,
        enum: ['User', 'Pharmacist', 'Doctor']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        refPath: "userType"
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "StoreProduct"
    },
    quantity: {
        type: Number,
        default: 1
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true })
const StoreCart = mongoose.model('StoreCart', cartSchema);
export default StoreCart