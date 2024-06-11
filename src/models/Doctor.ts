import mongoose from "mongoose";
import { doctorSpecialization } from "../utils/varibles";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'The name field is required!']
    },
    email: {
        type: String,
        required: [true, "The Eamil field is required!"],
        unique: [true, "The Email field must be required!"]
    },
    password: {
        type: String,
        require: [true, "The password field is required"]
    },
    country: {
        type: String,
        require: [true, "The Country field is required"]
    },
    Phone: {
        type: String,
        require: [true, "The Country field is required"]
    },
    picture: String,
    specialization: {
        type: String,
        enum: doctorSpecialization
    }
})

const Doctor = mongoose.model('Doctor', doctorSchema);
export default Doctor