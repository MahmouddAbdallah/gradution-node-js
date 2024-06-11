import mongoose from "mongoose";

const pharmacistSchema = new mongoose.Schema({
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
    country: {
        type: String,
        require: [true, "The Country field is required"]
    },
    Phone: {
        type: String,
        require: [true, "The Country field is required"]
    },
})

const Pharmacist = mongoose.model('Pharmacist', pharmacistSchema);
export default Pharmacist