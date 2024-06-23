import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    fromType: {
        type: String,
        enum: ['User', 'Doctor', 'Pharmacist'],
        required: true
    },
    toType: {
        type: String,
        enum: ['User', 'Doctor', 'Pharmacist'],
        required: true
    },
    from: {
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'fromType'
    },
    to: {
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'toType'
    },
    type: {
        type: String,
        enum: ['Appointment', 'Prescription', 'Medicine', 'LabReport'],
        required: true
    },
    message: {
        type: String,
    },
    isRead: {
        type: Boolean,
        default: false
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending"
    },

}, { timestamps: true })

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification