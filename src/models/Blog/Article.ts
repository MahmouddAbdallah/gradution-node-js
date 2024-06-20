import mongoose from "mongoose";

const articleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'The title field is required!']
    },
    userType: {
        type: String,
        enum: ['Doctor', 'Pharmacist'],
        required: [true, 'The user type field is required!']
    },
    user: {
        type: mongoose.Schema.ObjectId,
        refPath: "userType"
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