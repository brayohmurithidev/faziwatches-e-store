// import * as mongoose from "mongoose";
import express from "express";
import { getAllUsers } from "../controllers/users/index.js";

const router = express.Router();

router.get("/", getAllUsers);

export default router;
