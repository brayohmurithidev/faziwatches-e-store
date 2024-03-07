import mongoose from "mongoose";
import { Order } from "../../db/schemas/order.schema.js";
import { Inventory } from "../../db/schemas/product.schema.js";
import { APIResponse } from "../../utils/response.js";
import { reduceInventory } from "../products/inventory.controller.js";

const getOrder = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new Error("Order not found");
  }
  return order;
};

// CREATE ORDER - post  /orders
export const createOrder = async (req, res, next) => {
  const data = req.body;
  const userId = req.currentUser;

  // CREATE A TRANSACTION
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Reduce inventory for each item and create the order
    for (const item of data.items) {
      const product = await Inventory.findOne({ _id: item.productId }).session(
        session
      );

      // Check if the product exists and has sufficient quantity
      if (!product || product.quantity < item.quantity) {
        throw new Error("Insufficient inventory");
      }

      // Update the inventory quantity
      product.quantity -= item.quantity;
      await product.save();
    }

    // Create the order after successful inventory reduction
    const order = await Order.create([{ ...data, userId }], { session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return res.status(200).send(APIResponse(order, 200, null));
  } catch (error) {
    // If there was an error, abort the transaction
    await session.abortTransaction();
    session.endSession();
    return next(error);
  }
};

// GET ORDERS - GET /orders

// Get order by id - GET /orders/:orderId

// UPDATE ORDER STATUS - put /orders/:orderId/status

// UPDATE PAYMENT STATUS - put /orders/:orderId/payment-status

// UPDATE SHIPPING STATUS - PUT /orders/:orderId/shipping-status

// CANCEL ORDER - DELETE /orders/:orderId

// SEARCH FOR ORDERS BY status, user, date range - GET /orders/search

// EXPORT ORDERS TO CSV - GET /orders/export
