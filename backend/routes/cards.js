import express from "express";

import { getCards, createCard, getCardById, deleteCard, updateCard } from "../controllers/cards.js";

const router = express.Router();

//http://localhost:5000/cards
router.get("/", getCards);
router.get("/:id", getCardById);
router.patch("/:id", updateCard);
router.delete("/:id", deleteCard);
router.post("/", createCard);

export default router;
