import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'The title field is required!']
    },
    user: {
        _id: String,
        role: String
    },
    img: String,
    description: {
        type: String,
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "BlogCategory"
    }
}, { timestamps: true })
const BlogArticle = mongoose.model('BlogArticle', articleSchema);
export default BlogArticle