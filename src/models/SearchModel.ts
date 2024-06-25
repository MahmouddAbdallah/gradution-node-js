import mongoose from "mongoose";

const searchModelSchema = new mongoose.Schema({
    keyword: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    }
}, { timestamps: true })

const SearchModel = mongoose.model('SearchModel', searchModelSchema);
export default SearchModel