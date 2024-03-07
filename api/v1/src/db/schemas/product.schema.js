import mongoose, { Schema } from "mongoose";

// PRODUCTS RATINGS
const productRatings = new mongoose.Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    rating: { type: Number },
    review: { type: String },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

//PRODUCT VARIANTS
const productVariants = new mongoose.Schema(
  {
    variant: String,
    options: [String],
  },
  { timestamps: true }
);

//

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: String,
    price: { type: Number, required: true },
    discountedPrice: Number,
    images: [String],
    categories: String,
    tags: [String],
    variants: [productVariants],
    quantity: { type: Number, default: 0 },
    ratings: [productRatings],
    isFeatured: Boolean,
    isAvailable: { type: Boolean },
    sellerInfo: {
      name: String,
      description: String,
      phone: String,
      email: String,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to set isAvailable based on quantity
productSchema.pre("save", function (next) {
  this.isAvailable = this.quantity > 0;
  next();
});

const Inventory = mongoose.model("inventory", productSchema);

export { Inventory };
