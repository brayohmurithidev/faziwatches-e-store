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

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares goes here
app.use(cors());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //enough to work

// Routes goes here
app.use("/api/products", productsRoute);
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/mpesa", mpesaRoute);

//run the app
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
