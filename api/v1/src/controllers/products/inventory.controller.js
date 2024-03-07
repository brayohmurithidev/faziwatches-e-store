import { Inventory } from "../../db/schemas/product.schema.js";
import { APIResponse } from "../../utils/response.js";

// GET PRODUCT REUSABLE FUNCTION
const getProductById = async (productId) => {
  // find product
  const product = await Inventory.findById(productId);
  if (!product) {
    throw new Error("Product not found");
  }
  return product;
};

export const reduceInventory = async (productId, quantity, session) => {
  try {
    // find product
    const product = await Inventory.findOne({ _id: productId }, { session });
    if (!product) {
      throw new Error("Product not found");
    }
    if (product.quantity < 1) {
      throw new Error("Product is out of stock");
    }
    // UPDATE INVENTORY
    product.quantity -= parseInt(quantity);

    // SAVE PRODUCTS
    await product.save();

    return true; // Inventory reduced successfully
  } catch (error) {
    // Handle errors (e.g., log, return false)
    console.error(error.message);
    return false; // Inventory reduction failed
  }
};

// ADD INVENTORY - /inventory/add

export const add_inventory = async (req, res, next) => {
  const data = req.body;
  try {
    await Inventory.create(data);
    return res
      .status(200)
      .send(APIResponse("Product added to inventory Successfully!", 200, null));
  } catch (error) {
    return next(error);
  }
};

// REDUCE INVENTORY - /inventory/reduce - product id and quantity
export const reduce_inventory_quantity = async (req, res, next) => {
  const { quantity, productId } = req.body;
  try {
    const inventoryReduced = await reduceInventory(productId, quantity);
    if (inventoryReduced) {
      return res
        .status(200)
        .send(APIResponse("Sale completed successfully", 200, null));
    } else {
      return res
        .status(500)
        .send(APIResponse(null, 500, "Failed to reduce inventory"));
    }
  } catch (error) {
    return next(error);
  }
};

// LIST INVENTORY - /inventory

export const get_inventories = async (req, res, next) => {
  try {
    const inventories = await Inventory.find();
    if (inventories.length === 0) {
      return res.status(404).send(APIResponse(null, 404, "No products found"));
    }
    return res.status(200).send(APIResponse(inventories, 200, null));
  } catch (error) {
    return next(error);
  }
};

// VIEW SINGLE INVENTORY - /inventory/:prodId
export const get_inventory_by_id = async (req, res, next) => {
  const { productId } = req.params;
  try {
    const product = await Inventory.findById(productId);
    if (!product) {
      return res.status(404).send(APIResponse(null, 404, "No product found"));
    }
    return res.status(200).send(APIResponse(product, 200, null));
  } catch (error) {
    return next(error);
  }
};

// CREATE NEW PRODUCT RATING /inventory/:productId/rating
export const add_product_rating_by_productId = async (req, res, next) => {
  const { productId } = req.params;
  const userId = req.currentUser;
  const { rating, review } = req.body;
  if (!rating || rating.length === 0) {
    return res
      .status(400)
      .send(APIResponse(null, 400, "You must add a rating"));
  }
  try {
    // CHECK IF product exists
    const product = await Inventory.findById(productId);

    if (!product) {
      return res.status(404).send(APIResponse(null, 404, "Product not found"));
    }

    product.ratings.push({ userId, rating, review });

    product.save();

    res.status(200).send(APIResponse("Rating added successfully", 200, null));
  } catch (error) {
    return next(error);
  }
};

// UPDATE RATING BY RATING ID /inventory/:productId/rating
export const update_product_rating = async (req, res, next) => {
  const userId = req.currentUser;
  const { productId } = req.params;
  const { ratingId, ...data } = req.body;
  try {
    // GET product and comment
    const product = await getProductById(productId);
    const ratingToUpdate = product.ratings.id(ratingId);

    if (!ratingToUpdate) {
      return res.status(404).send(APIResponse(null, 404, "No rating found"));
    }
    if (ratingToUpdate.userId !== userId) {
      return res
        .status(404)
        .send(APIResponse(null, 404, "You can edit only your ratings"));
    }
    // UPDATE WITH THE PASSED DATA
    Object.keys(data).forEach((key) => {
      // Check if the key exists in the model's schema paths
      if (ratingToUpdate.schema.paths.hasOwnProperty(key)) {
        // If the key exists in the object, update its value
        if (ratingToUpdate.hasOwnProperty(key)) {
          ratingToUpdate[key] = data[key];
        } else {
          // If the key doesn't exist in the object, add it
          ratingToUpdate[key] = data[key];
        }
      }
    });

    await product.save();
    return res
      .status(200)
      .send(APIResponse("Review updated successfully", 200, null));
  } catch (error) {
    return next(error);
  }
};

// DELETE RATING
export const delete_rating = async (req, res, next) => {
  const userId = req.currentUser;
  const { productId } = req.params;
  const { ratingId } = req.body;
  try {
    const product = await getProductById(productId);
    const ratingToRemove = product.ratings.id(ratingId);

    if (!ratingToRemove) {
      return res.status(404).send(APIResponse(null, 404, "No rating found"));
    }

    // Find index
    const indexToRemove = product.ratings.findIndex(
      (val) => val._id === ratingToRemove._id
    );
    product.ratings.splice(indexToRemove, 1);
    product.save();
    return res
      .status(200)
      .send(APIResponse("Review deleted successfully", 200, null));
  } catch (error) {
    return next(error);
  }
};
