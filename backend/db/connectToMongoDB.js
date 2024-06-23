import mongoose from "mongoose";

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL,)
        console.log("Connected to MongoDb");
    } catch (error) {
        console.log("Error connecting MongoDB",error.message);
    }
};

export default connectToMongoDB;