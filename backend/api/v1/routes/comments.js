import express from "express";

import {
  getComments,
  createComment,
  getCommentById,
} from "../controllers/comments.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/blogs", getComments);
router.get("/:id", getCommentById);
router.post("/", auth, createComment);

export default router;
