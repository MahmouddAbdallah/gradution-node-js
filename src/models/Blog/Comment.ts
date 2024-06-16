import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: [true, 'The text field is required!']
    },
    user: {
        _id: String,
        role: String,
    },
    article: {
        type: mongoose.Schema.ObjectId,
        ref: 'BlogArticle',
        required: [true, 'The article field is required!']
    }
}, { timestamps: true })
const BlogComment = mongoose.model('BlogComment', commentSchema);
export default BlogComment