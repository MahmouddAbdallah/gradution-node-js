import mongoose from "mongoose";

const favSchema = new mongoose.Schema({
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
    }
}, { timestamps: true })
const StoreFav = mongoose.model('StoreFav', favSchema);
export default StoreFav