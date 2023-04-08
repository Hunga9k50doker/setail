import express from "express";

import { getCards, createCard, getCardById, deleteCard, updateCard, updateReviewCard } from "../controllers/cards.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//http://localhost:5000/cards
router.get("/", getCards);
router.get("/:id", auth, getCardById);
router.patch("/:id", auth, updateCard);
router.patch("/:id/review", auth, updateReviewCard);
router.delete("/:id", auth, deleteCard);
router.post("/", auth, createCard);

export default router;
