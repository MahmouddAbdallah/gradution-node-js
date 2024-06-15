import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'The title field is required!']
    },
    content: {
        type: String,
        require: [true, "Please Enter the content"]
    },
    img: String,
    video: String,
    tags: [String],
    article: {
        type: mongoose.Schema.ObjectId,
        ref: "BlogArticle"
    },
}, { timestamps: true })
const BlogSection = mongoose.model('BlogSection', sectionSchema);
export default BlogSection