import mongoose from "mongoose";
import { Order } from "../../db/schemas/order.schema.js";
import { Inventory } from "../../db/schemas/product.schema.js";
import { APIResponse } from "../../utils/response.js";
import { exceptionError } from "../../middlewares/errorHandle.middleware.js";

// EXPORT DATA
import { AsyncParser } from "@json2csv/node";

const getOrder = async (orderId) => {
  const order = await Order.findById(orderId);
  console.log(order);
  if (!order) {
    return exceptionError(404, "Order not found");
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
        return exceptionError(404, "Insufficient inventory");
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
export const get_orders = async (req, res, next) => {
  try {
    const orders = await Order.find().populate({
      path: "userId",
      select: "-password",
    });
    if (!orders || orders.length === 0) {
      return exceptionError(404, "No orders found");
    }
    return res.status(200).send(APIResponse(orders, 200, null));
  } catch (error) {
    return next(error);
  }
};

// Get order by id - GET /orders/:orderId

export const get_orderByID = async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const order = await getOrder(orderId);
    return res.status(200).send(APIResponse(order, 200, null));
  } catch (error) {
    return next(error);
  }
};

// UPDATE ORDER STATUS - put /orders/:orderId/status
export const updateOrderStatus = async (req, res, next) => {
  const { orderId } = req.params;
  const { orderStatus } = req.body;
  const expectedStatus = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  try {
    if (!expectedStatus.includes(orderStatus)) {
      return exceptionError(400, "Wrong status value");
    }
    const orderToUpdate = await getOrder(orderId);
    orderToUpdate.orderStatus = orderStatus;
    orderToUpdate.save();
    return res
      .status(200)
      .send(APIResponse("Order status updated successfully", 200, null));
  } catch (error) {
    return next(error);
  }
};
// UPDATE PAYMENT STATUS - put /orders/:orderId/payment-status
export const updatePaymentStatus = async (req, res, next) => {
  const { orderId } = req.params;
  const { paymentStatus } = req.body;
  const expectedStatus = ["paid", "pending", "failed"];
  try {
    if (!expectedStatus.includes(paymentStatus)) {
      return exceptionError(400, "Wrong payment status value");
    }
    const orderToUpdate = await getOrder(orderId);
    orderToUpdate.paymentStatus = paymentStatus;
    orderToUpdate.save();
    return res
      .status(200)
      .send(
        APIResponse("Order payment status updated successfully", 200, null)
      );
  } catch (error) {
    return next(error);
  }
};

// UPDATE SHIPPING STATUS - PUT /orders/:orderId/shipping-status
export const updateShippingStatus = async (req, res, next) => {
  const { orderId } = req.params;
  const { shippingStatus } = req.body;
  const expectedStatus = [
    "pending confirmation",
    "shipped",
    "in transit",
    "delivered",
  ];
  try {
    if (!expectedStatus.includes(shippingStatus)) {
      return exceptionError(400, "Wrong shipping status value");
    }
    const orderToUpdate = await getOrder(orderId);
    orderToUpdate.shippingStatus = shippingStatus;
    orderToUpdate.save();
    return res
      .status(200)
      .send(
        APIResponse("Order shipping status updated successfully", 200, null)
      );
  } catch (error) {
    return next(error);
  }
};

// CANCEL ORDER - DELETE /orders/:orderId
export const cancelOrder = async (req, res, next) => {
  const { orderId } = req.params;
  try {
    const orderToCancel = await getOrder(orderId);
    orderToCancel.orderStatus = "cancelled";
    orderToCancel.save();
    return res
      .status(200)
      .send(APIResponse("Order cancelled successfully", 200, null));
  } catch (error) {
    return next(error);
  }
};

// SEARCH FOR ORDERS BY status, date range - GET /orders/search
export const searchOrdersBy = async (req, res, next) => {
  const { paymentStatus, status, shippingStatus, dateRange } = req.query;

  try {
    const orders = await Order.find({
      $or: [
        { orderStatus: status },
        { paymentStatus: paymentStatus },
        { shippingStatus: shippingStatus },
        { createdAt: { $gt: dateRange?.split("to")[0] } },
        { createdAt: { $lt: dateRange?.split("to")[1] } },
      ],
    }).populate({
      path: "userId",
    });
    if (orders.length === 0) {
      return exceptionError(404, "No orders matching your search");
    }

    return res.status(200).send(APIResponse(orders, 200, null));
  } catch (error) {
    return next(error);
  }
};

// EXPORT ORDERS TO CSV - GET /orders/export

export const exportOrders = async (req, res, next) => {
  const opts = {};
  const transformOpts = {};
  const asyncOpts = {};
  const parser = new AsyncParser(opts, asyncOpts, transformOpts);
  try {
    const orders = await Order.find();
    const csv = await parser.parse(orders).promise();
    console.log(csv);
    res.header("Content-Type", "text/csv");
    res.attachment("my file");
    return res.status(200).send(csv);
  } catch (error) {
    return next(error);
  }
};
