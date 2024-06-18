import mongoose from "mongoose";

const bioSchema = new mongoose.Schema({
    experience: {
        type: String
    },
    socialMedia: [
        {
            platform: String,
            link: String
        }
    ],
    // skills: [
    //     {
    //         skill: String,
    //         level: String
    //     }
    // ],
    location: {
        type: String,
    },
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
    aboutme: String
}, { timestamps: true })

const Bio = mongoose.model('Bio', bioSchema);
export default Bio