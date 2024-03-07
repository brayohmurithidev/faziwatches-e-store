import * as mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    address: String,
    country: String,
    state: String,
    city: String,
    postalCode: Number,
    phone: String,
    isPrimary: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const paymentMethodSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    details: {
      type: Map,
      of: String,
    },
    isPrimary: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: { type: String, required: true },
    addresses: [addressSchema],
    paymentMethods: [paymentMethodSchema],
    otherInformation: {
      type: Map,
      of: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("users", userSchema);

export { User };
