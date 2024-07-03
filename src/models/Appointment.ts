import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: [true, "This field is required!!"]
    },
    timeSlot: {
        type: String,
        required: [true, "This field is required!!"]
    },
    patient: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: [true, "This field is required!!"]
    },
    doctor: {
        type: mongoose.Schema.ObjectId,
        ref: "Doctor",
        required: [true, "This field is required!!"]
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },
    noted: {
        type: String
    }
}, { timestamps: true })

const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment