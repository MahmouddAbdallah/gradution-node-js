import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({

}, { timestamps: true })

const Notification = mongoose.model('Notification', notificationSchema);
export default Notification