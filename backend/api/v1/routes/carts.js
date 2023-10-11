import express from "express";

import {
  getCarts,
  createCart,
  deleteCart,
  updateCart,
} from "../controllers/carts.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getCarts);
router.patch("/:id", auth, updateCart);
router.delete("/", auth, deleteCart);
router.post("/", auth, createCart);

export default router;
