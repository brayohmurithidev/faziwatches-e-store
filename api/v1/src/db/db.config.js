import * as mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const URI = process.env.MONGO_URI;

//CREATE CONNECTION
const connection = async () => {
  await mongoose.connect(URI);
  console.log("Connected to db");
};

//call the function and console error
connection().catch((err) => console.log(err));
