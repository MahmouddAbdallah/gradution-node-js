import mongoose from "mongoose";

const connectDB = async (url: string) => {
    try {
        await mongoose.connect(url)
        console.log('connected to db');
        return true
    } catch (error) {
        console.error(error);
    }
}
export default connectDB;