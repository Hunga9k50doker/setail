import express from "express";

import {
  getComments,
  createComment,
  getCommentById,
  deleteComment,
  updateComment,
} from "../controllers/comments.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", getComments);
router.post("/", auth, createComment);
router.get("/:id", getCommentById);
router.delete("/:id", auth, deleteComment);
router.put("/:id", auth, updateComment);

export default router;
