import { Product } from "../db/schemas/product.schema.js";
import { APIResponse } from "../utils/response.js";
import { toObjectId } from "../utils/db.utils.js";

// CREATE NEW PRODUCT
export const createProduct = async (req, res) => {
  try {
    const productToCreate = req.body;
    const newProduct = await Product.insertMany(productToCreate);
    res.status(200).send(newProduct);
  } catch (error) {}
};

//GET ALL PRODUCTS
export const getAllProducts = async (req, res) => {
  try {
    let params = req.query;
    let products;
    if (params && params.hasOwnProperty("search")) {
      products = await Product.find({
        $or: [
          { productName: new RegExp(params["search"], "i") },
          { categories: new RegExp(params["search"], "i") },
          { brand: new RegExp(params["search"], "i") },
          { description: new RegExp(params["search"], "i") },
        ],
      });
    } else {
      products = await Product.find();
    }
    if (products.length === 0)
      return res.status(404).send(APIResponse(null, 404, "No products found"));
    return res.status(200).send(APIResponse(products, 200, null));
  } catch (error) {
    console.log(error);
  }
};

// FIND ONE BY ID
export const getProductById = async (req, res) => {
  const id = toObjectId(req.params);
  try {
    let product = await Product.findById(id);
    if (!product)
      return res.status(404).send(APIResponse(null, 404, "Product not found"));
    return res.status(200).send(APIResponse(product, 200, null));
  } catch (error) {
    console.log(error);
  }
};

// SEARCH BY NAME
// export const searchByNameOrCategory = async (req, res) => {
//   try {
//     const search = req.query;
//     const products = Product
//       .find
//       //     {
//       //   $or: [{ productName: /sports/i }, { categories: /men/i }],
//       // }
//       ();
//     if (products.length === 0)
//       return res.status(404).send(APIResponse(null, 404, "No products found"));
//     return res.status(200).send(APIResponse(products, 200, null));
//   } catch (error) {
//     console.log(error);
//     return;
//   }
// };
