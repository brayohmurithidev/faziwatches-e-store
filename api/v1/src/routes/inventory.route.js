import express from "express";
import {
  add_inventory,
  add_product_rating_by_productId,
  delete_rating,
  get_inventories,
  get_inventory_by_id,
  reduce_inventory_quantity,
  update_product_rating,
} from "../controllers/products/inventory.controller.js";
import { verifyToken } from "../controllers/users/auth.controller.js";

const router = express.Router();

router.post("/add", add_inventory);
router.post("/reduce", reduce_inventory_quantity);
router.get("/", get_inventories);
router.get("/:productId", get_inventory_by_id);

// RATINGS
router.post("/:productId/rating", verifyToken, add_product_rating_by_productId);
router.put("/:productId/rating", verifyToken, update_product_rating);
router.delete("/:productId/rating", verifyToken, delete_rating);

export default router;
