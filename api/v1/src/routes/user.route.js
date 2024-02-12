// import * as mongoose from "mongoose";
import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
} from "../controllers/users/user.controller.js";
import { verifyToken } from "../controllers/users/auth.controller.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getAllUsers);
router.get("/:userId", getUser);

export default router;
