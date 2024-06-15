import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name field is required!']
    },
    email: {
        type: String,
        required: [true, "The Eamil field is required!"],
        unique: [true, "The Email field must be required!"]
    },
    picture: String,
    password: {
        type: String,
        require: [true, "The password field is required"]
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: "user"
    }
}, { timestamps: true })
const User = mongoose.model('User', userSchema);
export default User