import mongoose from 'mongoose';

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URI,{
            
        });
        console.log('Mongodb connected');
    } catch (error) {
        console.error('Db connection error:',error.message);
        process.exit(1)
    }
}

export default connectDB;