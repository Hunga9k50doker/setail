import express from "express";

import { getCards, createCard, getCardById } from "../controllers/cards.js";

const router = express.Router();

//http://localhost:5000/cards
router.get("/", getCards);
router.get("/:id", getCardById);
router.post("/", createCard);

export default router;
