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
const BlogCategory = mongoose.model('BlogCategory', categorySchema);
export default BlogCategory