import express from "express";

import { searchCard } from "../controllers/cards.js";

const router = express.Router();

router.get("/", searchCard);

export default router;
