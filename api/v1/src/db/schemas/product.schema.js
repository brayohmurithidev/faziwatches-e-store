import mongoose from "mongoose";

const productSchema = mongoose.Schema(
  {
    productName: { type: String, required: true },
    description: String,
    price: {
      type: Map,
      of: String,
    },
    categories: [String],
    brand: String,
    quantity: Number,
    images: [String],
    thumbnail: String,
    isFeatured: Boolean,
    isAvailable: Boolean,
    otherAttributes: {
      type: Map,
      of: String,
    },
  },
  { timestamps: true },
);

const Product = mongoose.model("products", productSchema);

export { Product };
