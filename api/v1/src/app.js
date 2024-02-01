import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

dotenv.config();

// IMPORT ROUTES
import "./db/db.config.js";
import indexRoute from "./routes/index.js";
import productsRoute from "./routes/products.route.js";

const app = express();
const PORT = process.env.PORT || 4000;

// Middlewares goes here
app.use(cors());
app.use(bodyParser({ extended: false }));

// Routes goes here
app.use("/api/products", productsRoute);

//run the app
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
