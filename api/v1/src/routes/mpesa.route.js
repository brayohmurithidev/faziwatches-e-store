import express from "express";
import {callBack, getOuthToken, lipaNaMpesaOnline} from "../controllers/mpesa/mpesa.controller.js";

const router = express.Router();


router.post('/', getOuthToken, lipaNaMpesaOnline);
router.post('/callback', callBack)


export default router;