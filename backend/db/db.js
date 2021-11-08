import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION, {
      useNewUrlparser: true,
      useUnifiedTopology: true,
    });
    console.log("Connection with MongoDB: Ok");
  } catch (error) {
    console.log("Error Connecting to MongoDB: \n" + error);
  }
};

export default { dbConnection };