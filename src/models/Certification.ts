import mongoose from "mongoose";

const CertificationSchema = new mongoose.Schema({
    userType: {
        type: String,
        enum: ['Doctor', 'Pharmacist'],
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "userType",
        required: true
    },
    imgs: [
        String
    ]
}, { timestamps: true })

const Certification = mongoose.model('Certification', CertificationSchema);
export default Certification