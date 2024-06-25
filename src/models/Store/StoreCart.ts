import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    userType: {
        type: String,
        enum: ['User', 'Pharmacist', 'Doctor'],
        required: [true, 'Please enter the role of user']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        refPath: "userType",
        required: true
    },
    product: {
        type: mongoose.Schema.ObjectId,
        ref: "StoreProduct",
        required: true
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