// import * as mongoose from "mongoose";
import express from "express";
import {add_user_billing_addresses, createUser, getAllUsers, getUserProfile, update_user_single_billing_address, } from "../controllers/users/user.controller.js";
import {verifyToken} from "../controllers/users/auth.controller.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", verifyToken, getAllUsers);
router.get('/:userId/profile', verifyToken, getUserProfile)
router.post('/:usersId/address', verifyToken, add_user_billing_addresses)
router.put('/address/:addressId', verifyToken, update_user_single_billing_address)

export default router;
