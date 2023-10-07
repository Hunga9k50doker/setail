import express from "express";

import {
  getCards,
  createCard,
  getCardById,
  deleteCard,
  updateCard,
  updateReviewCard,
} from "../controllers/cards.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getCards);
router.get("/:id", getCardById);
router.patch("/:id", auth, updateCard);
router.patch("/:id/review", auth, updateReviewCard);
router.delete("/:id", auth, deleteCard);
router.post("/", auth, createCard);

export default router;
