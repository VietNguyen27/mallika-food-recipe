import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const connect = await mongoose.connect(process.env.MONGODB_CONNECTION);

    console.log('MongoDB is connected at ' + connect.connection.host);
  } catch (error) {
    console.log('There is some errors when connect to mongodb: ' + error);
  }
};

export default connectDB;
