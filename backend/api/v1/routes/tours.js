import express from "express";

import { getTours, createTour, getTourById } from "../controllers/tours.js";
import auth from "../middleware/auth.js";

const router = express.Router();

//http://localhost:5000/cards
router.get("/my-tour", auth, getTours);
router.get("/:id", auth, getTourById);
router.post("/", auth, createTour);
// router.patch("/:id", auth, updateTour);
// router.patch("/:id/review", auth, updateReviewTour);
// router.delete("/:id", auth, deleteTour);

export default router;
