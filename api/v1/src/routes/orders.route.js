import express from "express";
import {
  createOrder,
  exportOrders,
  get_orderByID,
  get_orders,
  searchOrdersBy,
  updateOrderStatus,
  updatePaymentStatus,
  updateShippingStatus,
} from "../controllers/orders/orders.controller.js";
import { verifyToken } from "../controllers/users/auth.controller.js";

const router = express();

// CREATE ORDER - post  /orders

router.post("/", verifyToken, createOrder);

// GET ORDERS - GET /orders
router.get("/", verifyToken, get_orders);
// SEARCH FOR ORDERS BY status, user, date range - GET /orders/search
router.get("/search", verifyToken, searchOrdersBy);

// EXPORT ORDERS TO CSV - GET /orders/export
router.get("/export", exportOrders);

// Get order by id - GET /orders/:orderId
router.get("/:orderId", verifyToken, get_orderByID);

// UPDATE ORDER STATUS - put /orders/:orderId/status
router.put("/:orderId/status", verifyToken, updateOrderStatus);

// UPDATE PAYMENT STATUS - put /orders/:orderId/payment-status
router.put("/:orderId/payment-status", verifyToken, updatePaymentStatus);

// UPDATE SHIPPING STATUS - PUT /orders/:orderId/shipping-status
router.put("/:orderId/shipping-status", verifyToken, updateShippingStatus);

// CANCEL ORDER - DELETE /orders/:orderId
router.delete("/:orderId");

export default router;
