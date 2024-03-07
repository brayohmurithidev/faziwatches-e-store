import mongoose, { Schema } from "mongoose";

// items - productID, quantity, price
const itemsSchema = new Schema({
  productId: {
    type: Schema.ObjectId,
    ref: "inventory",
    required: true,
  },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
});

const orderSchema = new Schema(
  {
    userId: { type: Schema.ObjectId, ref: "users" },
    items: [itemsSchema],
    totalPrice: { type: Number, required: true },
    shippingAddress: {
      type: Map,
      of: String,
    },
    billingAddress: {
      type: Map,
      of: String,
    },
    paymentMethod: {
      method: String,
      details: {
        type: Map,
        of: String,
      },
    },
    orderStatus: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
      required: true,
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["paid", "pending", "failed"],
      required: true,
      default: "pending",
    },
    shippingStatus: {
      type: String,
      enum: ["pending confirmation", "shipped", "in transit", "delivered"],
      required: true,
      default: "in transit",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("orders", orderSchema);

export { Order };
