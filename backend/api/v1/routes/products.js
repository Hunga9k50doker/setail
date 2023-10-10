import express from "express";

import {
  getProducts,
  createProduct,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../controllers/products.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/:id", getProductById);
router.patch("/:id", auth, updateProduct);
router.delete("/:id", auth, deleteProduct);
router.post("/", auth, createProduct);

export default router;
