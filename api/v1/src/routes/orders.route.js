import express from "express";
import { createOrder } from "../controllers/orders/orders.controller.js";
import { verifyToken } from "../controllers/users/auth.controller.js";

const router = express();

// CREATE ORDER - post  /orders

router.post("/", verifyToken, createOrder);

// GET ORDERS - GET /orders

// Get order by id - GET /orders/:orderId

// UPDATE ORDER STATUS - put /orders/:orderId/status

// UPDATE PAYMENT STATUS - put /orders/:orderId/payment-status

// UPDATE SHIPPING STATUS - PUT /orders/:orderId/shipping-status

// CANCEL ORDER - DELETE /orders/:orderId

// SEARCH FOR ORDERS BY status, user, date range - GET /orders/search

// EXPORT ORDERS TO CSV - GET /orders/export

export default router;
