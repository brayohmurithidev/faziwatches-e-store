import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
// IMPORT ROUTES
import "./db/db.config.js";
import cookieParser from "cookie-parser";
import productsRoute from "./routes/products.route.js";
import userRoute from "./routes/user.route.js";
import authRoute from "./routes/auth.route.js";
import mpesaRoute from "./routes/mpesa.route.js";
import { errorHandlerMiddleware } from "./middlewares/errorHandle.middleware.js";
import mongoose from "mongoose";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares goes here
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //enough to work

// Routes goes here
app.get('/test', (req, res) => {
    res.status(200).json({
        message: 'This is a test route'
    })
})

// CHECK IF DB IS CONNECTED
app.use((req,res, next)=>{
console.log('Testing mongodb connection')
   // Check if mongoose has an active connection
  if (mongoose.connection.readyState === 1) {
    next(); // Mongoose is connected, proceed to the next middleware/route handler
  } else {
    // Mongoose is not connected, throw an error
    const error = new Error('Database is not connected');
    error.status = 500;
    next(error);
  }
})



app.use("/api/products", productsRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/mpesa", mpesaRoute);


// ERROR HANDLE MIDDLEWARE
app.use(errorHandlerMiddleware)

//run the app
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
