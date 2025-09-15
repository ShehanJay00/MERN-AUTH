import mongoose from "mongoose";

const connectDB = async (url) => {

    mongoose.connection.on('connected', () => {
        console.log('MongoDB is connected Successfully');
    });

    await mongoose.connect(`${process.env.MONGODB_URI}/mern-auth`);
}

export default connectDB;   



