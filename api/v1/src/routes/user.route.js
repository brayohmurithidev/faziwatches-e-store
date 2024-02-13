// import * as mongoose from "mongoose";
import express from "express";
import {
  createUser,
  getAllUsers,
} from "../controllers/users/user.controller.js";
import { verifyToken } from "../controllers/users/auth.controller.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", verifyToken, getAllUsers);

export default router;
