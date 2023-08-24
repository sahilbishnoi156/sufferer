import mongoose from 'mongoose';
import dotenv from 'dotenv'; // Import dotenv like this
dotenv.config(); // Call the config method

let isConnected = false; // track the connection

export const connectToDB = async () => {
  mongoose.set('strict', true); // Use 'strict' instead of 'strictQuery'

  if (isConnected) {
    console.log('MongoDB is already connected');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "quotomania",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    isConnected = true;

    console.log('MongoDB connected');
  } catch (error) {
    console.log(error);
  }
};
