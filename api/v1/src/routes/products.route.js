//ALL PRODUCT ROUTES GOES HERE
import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  // searchByNameOrCategory,
} from "../controllers/product.controller.js";

const router = Router();

router.post("/", createProduct);
router.get("/", getAllProducts);
// router.get("/search", searchByNameOrCategory);
router.get("/:id", getProductById);

export default router;
