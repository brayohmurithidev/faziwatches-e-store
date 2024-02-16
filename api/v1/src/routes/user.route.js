// import * as mongoose from "mongoose";
import express from "express";
import {createUser, getAllUsers, getUserProfile, update_addresses,} from "../controllers/users/user.controller.js";
import {verifyToken} from "../controllers/users/auth.controller.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", verifyToken, getAllUsers);
router.get('/profile', verifyToken, getUserProfile)
router.put('/address', verifyToken, update_addresses)

export default router;
