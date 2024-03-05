// import * as mongoose from "mongoose";
import express from "express";
import {
  addUserPayment_paymentMethods,
  add_user_billing_addresses,
  createUser,
  deleteAddressById,
  deletePaymentById,
  getAllUsers,
  getUserProfile,
  updateUserPayment_paymentMethods,
  update_user_single_billing_address,
} from "../controllers/users/user.controller.js";
import { verifyToken } from "../controllers/users/auth.controller.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", verifyToken, getAllUsers);
router.get("/:userId/profile", verifyToken, getUserProfile);
router.post("/:usersId/address", verifyToken, add_user_billing_addresses);
router.put(
  "/address/:addressId",
  verifyToken,
  update_user_single_billing_address
);
router.post(
  "/:usersId/paymentMethod",
  verifyToken,
  addUserPayment_paymentMethods
);
router.put(
  "/paymentMethod/:paymentMethodId",
  verifyToken,
  updateUserPayment_paymentMethods
);

// DELETE
router.delete("/address/:addressId", verifyToken, deleteAddressById);
router.delete(
  "/paymentMethod/:paymentMethodId",
  verifyToken,
  deletePaymentById
);

export default router;
