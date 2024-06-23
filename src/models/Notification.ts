import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    userType: {
        type: String,
        enum: ['User', 'Doctor', 'Pharmacist'],
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required: true,
        refPath: 'userType'
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
    schemaId: {
        type: mongoose.Schema.ObjectId,
        refPath: 'type'
    }

}, { timestamps: true })

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification