import express from "express";

import { getBlogs, createBlog, getBlogById } from "../controllers/blogs.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/blogs", getBlogs);
router.get("/:id", getBlogById);
router.post("/", auth, createBlog);

export default router;
