import express from "express";
import { login, refreshToken } from "../controllers/users/auth.controller.js";

const router = express.Router();

router.post("/", login);
router.get("/refresh-token", refreshToken);

export default router;
