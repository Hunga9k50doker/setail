import express from "express";

import {
  getCarts,
  createCart,
  getCartById,
  deleteCart,
  updateCart,
  getCartByUserId,
} from "../controllers/carts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getCarts);
router.get("/user", getCartByUserId);
router.get("/:id", getCartById);
router.patch("/:id", auth, updateCart);
router.delete("/:id", auth, deleteCart);
router.post("/", auth, createCart);

export default router;
