import * as mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGO_URI;

//CREATE CONNECTION
const connection = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connected to db");
  } catch (error) {
    throw new Error('Fatal Error: Database failed to connect') 
  }

};

//call the function and console error
connection().catch((err) => console.log(err));
