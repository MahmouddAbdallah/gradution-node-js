import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name field is required!']
    },
    img: {
        type: String
    },
    description: {
        type: String
    }
}, { timestamps: true })
const StoreCategory = mongoose.model('StoreCategory', categorySchema);
export default StoreCategory